import React, { useState, useEffect } from 'react';
import { supabase } from '../components/Database.js';
import Modal from '../components/Modal.js';
import '../components/table.css';
import '../buttons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../components/Loading.js';

const db = supabase;

export default function AdminPage() {

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState({});
    const [userError, setUserError] = useState('');
    const [adminUpdate, setAdminUpdate] = useState('');

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        const allUsers = await db.from('users').select()
        const filteredUsers = allUsers.data.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase())
        );
        console.log(filteredUsers);
        if (filteredUsers.length === 0) {
            setUserError('Impossibile trovare un utente con questo username')
        } else {
            setUserError('')
        }
        setUsers(filteredUsers);
    };

    useEffect(() => {
        setLoading(true)
        db.from('users').select().then((response) => {
            setUsers(response.data);
        });
        setLoading(false)
    }, []);

    async function getAllUsers() {
        let response = await db.from('users').select()
        setUsers(response.data);

    }

    setTimeout(() => setAdminUpdate(''), 10000)

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
            await db.from('users').update({
                'username': editingUser.username, 'password': editingUser.password, 'name': editingUser.name,
                'surname': editingUser.surname, 'birthday': editingUser.birthday
            }).eq('id', editingUser.id);
            await db.from('users').select().then((response) => {
                setUsers(response.data);
            });
            setModalOpen(false);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    const updateAdmin = async (userId, role, name) => {
        try {
            const response = await supabase.from('users').update({ admin: role }).eq('id', userId);
            console.log(response);
            setAdminUpdate('Utente [ ' + name + ' ] reso admin con successo!');
        } catch (error) {
            console.error(error);
        }
    }

    const removeAdmin = async (userId, role, name) => {
        try {
            const response = await supabase.from('users').update({ admin: role }).eq('id', userId);
            console.log(response);
            setAdminUpdate('Utente [ ' + name + ' ] non più admin');
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <><div>
            {loading ? (
                <Loading />
            ) : (
            
            <form class='center'>
                <h1>UTENTI</h1>
                <input type="text" id="search" onChange={handleChangeSearch} />
                <button type="button" className="c3-search" onClick={handleSearch}>Cerca</button>
                <button type="reset" className="c3-err" onClick={getAllUsers}>Reset</button>

            </form>)}
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
                                <button className='c3-wait' onClick={() => handleEdit(user)}>Modifica</button>
                            </td>
                            <td>
                                <button className='c3-err' onClick={() => handleDelete(user.id)}>Elimina</button>
                            </td>
                            <td>
                                <button onClick={() => updateAdmin(user.id, '1', user.username)}>Set Admin</button>
                            </td>
                            <td>
                                <button onClick={() => removeAdmin(user.id, '0', user.username)}>Remove Admin</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            {adminUpdate && <div className="text-danger">{adminUpdate}</div>}
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
            </div>
        </>
    );
}

