import React, { useState, useEffect, useNavigate  } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from './Database.js';
import Modal from './Modal.js';
import './table.css';

/*
Pagina con table con tutti gli user, possibilità di cercare user e di modificare i dati
*/

const db = supabase;


export default function AdminPage({ session }) {

    const [loading, setLoading] = useState(true)

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
    
          if (data.admin==0) {
            //useNavigate("./loginSupabase");
            //redirect to login??
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
      }

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState({});

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


    return (
        <>
            UTENTI
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
                        </tr>
                    ))}
                </tbody>
            </table >
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={editingUser.username}
                        onChange={handleChange('username')}
                    />
                    <input
                        type="text"
                        value={editingUser.password}
                        onChange={handleChange('password')}
                    />
                    <input
                        type="text"
                        value={editingUser.name}
                        onChange={handleChange('name')}
                    />
                    <input
                        type="text"
                        value={editingUser.surname}
                        onChange={handleChange('surname')}
                    />
                    
                    <input
                        type="date"
                        value={editingUser.birthday}
                        onChange={handleChange('birthday')}
                    />
                    <button type="submit">Salva</button>
                </form>
            </Modal>
            {error && <div className="error-message">{error}</div>}

        </>
    );
}

