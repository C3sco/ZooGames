import React, { useState, useEffect } from 'react';
import { supabase } from './Database.js';
import Modal from './Modal.js';
/*
Pagina con table con tutti gli user, possibilità di cercare user e di modificare i dati
*/

const db = supabase;

// async function getSingleUser(username) {

//     try {
//         var user = await db.from('users').select('*').eq('username', username);
//     } catch (err) {
//         console.log("Connessione al database fallita: " + err);
//     }
//     return user
// }

// async function deleteUser(username) {

//     try {
//         await db.from('users').delete('*').eq('username', username);
//     } catch (err) {
//         console.log("Connessione al database fallita: " + err);
//     }
//     console.log("L'utente " + username + " è stato eliminato correttamente");

// }


export default function AdminPage() {

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

