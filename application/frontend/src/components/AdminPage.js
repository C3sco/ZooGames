import React, { useState, useEffect, useNavigate } from 'react';
import { supabase } from './Database.js';
import Modal from './Modal.js';
import './table.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
Pagina con table con tutti gli user, possibilità di cercare user e di modificare i dati
*/

const db = supabase;


export default function AdminPage({ session }) {

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState({});
    const [userError, setUserError] = useState('');

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        const allUsers = await db.from('users').select()
        const filteredUsers = allUsers.data.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase())
        );
        console.log(filteredUsers);
        if (filteredUsers.length == 0) {
            setUserError('Impossibile trovare un utente con questo username')
        } else {
            setUserError('')
        }
        setUsers(filteredUsers);
    };

    useEffect(() => {
        getProfile()
    }, [session])

    const getProfile = async () => {
        try {
            setLoading(true)
            const { user } = session

            let { data, error, status } = await supabase
                .from('users')
                .select(`email`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data.admin === 0) {
                //useNavigate("./loginSupabase");
                //redirect to login??
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        db.from('users').select().then((response) => {
            setUsers(response.data);
        });
    }, []);


    async function handleDelete(id) {
        try {
            await supabase.from('users').delete(id);
            db.from('users').select().then((response) => {
                setUsers(response.data);
            });

        } catch (error) {
            console.error(error);
            setError(error.message)
        }
    }

    function handleEdit(user) {
        setEditingUser(user);
        setModalOpen(true);
    }


    function handleChange(field) {
        return (event) => {
            setEditingUser({ ...editingUser, [field]: event.target.value });
        };
    }
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await db.from('users').update(editingUser.id, { data: editingUser });
            db.from('users').select().then((response) => {
                setUsers(response.data);
            });
            setModalOpen(false);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    const updateRole = async (userId, role) => {
        try {
            const response = await supabase.from('users').update({ isAdmin: role }).eq('id', userId);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <h1>UTENTI</h1>
            <form class='center'>
                <input type="text" id="search" onChange={handleChangeSearch} />
                <button type="submit" className="" onClick={handleSearch}>Cerca</button>
            </form>
            {userError && <div className="text-danger">{userError}</div>}
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Data di Nascita</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.birthday}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Modifica</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(user.id)}>Elimina</button>
                            </td>
                            <td>
                                <button onClick={() => updateRole(user.id, '1')}>Admin</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder='username'
                        type="text"
                        value={editingUser.username}
                        onChange={handleChange('username')}
                    /> <br></br><br></br>
                    <input
                        placeholder='password'
                        type="text"
                        value={editingUser.password}
                        onChange={handleChange('password')}
                    /> <br></br><br></br>
                    <input
                        placeholder='nome'
                        type="text"
                        value={editingUser.name}
                        onChange={handleChange('name')}
                    /><br></br><br></br>
                    <input
                        placeholder='cognome'
                        type="text"
                        value={editingUser.surname}
                        onChange={handleChange('surname')}
                    /> <br></br><br></br>
                    <input
                        placeholder='birthday'
                        type="date"
                        value={editingUser.birthday}
                        onChange={handleChange('birthday')}
                    /> <br></br><br></br>
                    <button type="submit" className='btn btn-success'>Salva</button>
                </form>
            </Modal>
            {error && <div className="error-message">{error}</div>}

        </>
    );
}

