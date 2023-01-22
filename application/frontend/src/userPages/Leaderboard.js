import { supabase } from '../components/Database.js';
import '../components/table.css';
import React, { useState, useEffect } from 'react';
import '../buttons.css'

export default function Leaderboard({ session }) {

    const db = supabase;

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [userError, setUserError] = useState('');

    useEffect(() => {
        getProfile()
    }, [session])

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
    
    async function getAllUsers(){
        let response = await db.from('users').select()
        setUsers(response.data);

    }


    return (
        <>
            <h1>LEADERBOARD</h1>
            <form class='center'>
                <input type="text" id="search" onChange={handleChangeSearch} /> &nbsp; &nbsp;
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