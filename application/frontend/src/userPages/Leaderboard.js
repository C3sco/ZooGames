import { supabase } from '../components/Database.js';
import '../components/table.css';
import React, { useState, useEffect } from 'react';
import '../buttons.css'

export default function Leaderboard({ session }) {

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [userError, setUserError] = useState('');

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        const allUsers = await supabase.from('users').select()
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
        supabase.from('users').select().order('score',{ascending:false}).then((response) => {
            setUsers(response.data);
        });
    }, []);
    
    async function getAllUsers(){
        let response = await supabase.from('users').select()
        setUsers(response.data);
    }

    setTimeout(() => setUserError(''), 3000)



    return (
        <>
            <h1>LEADERBOARD</h1>
            <form class='center'>
                <input type="text" id="search" placeholder='Cerca' onChange={handleChangeSearch} /> &nbsp; &nbsp;
                <button type="button" className="c3-play" onClick={handleSearch}>Cerca</button> &nbsp; &nbsp;
                <button type="reset" className="c3-err" onClick={getAllUsers}>Reset</button>
                
            </form>
            {userError && <div className="text-danger">{userError}</div>}
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.score}</td>
                            </tr>
                            ))}
                </tbody>
            </table >
            </>
    )

}