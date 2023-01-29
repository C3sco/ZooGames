import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from '../components/Database.js';
import { Link } from 'react-router-dom'
import '../buttons.css'
import ForumImage from './ForumImage.js';

const db = supabase

const Forum = ({ session }) => {
    const [posts, setPosts] = useState([])
    const [categoryFilter, setCategoryFilter] = useState('')
    const [postError, setPostError] = useState('');
    const [search, setSearch] = useState('');
    // const [successAlert, setSuccessAlert] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const posts = await db.from('posts').select().order('created_at', true)
            setPosts(posts.data)
        }
        fetchData()

    }, [])

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        const allPosts = await db.from('posts').select()
        const filteredPosts = allPosts.data.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );
        console.log(filteredPosts);
        if (filteredPosts.length === 0) {
            setPostError('Impossibile trovare un post con questo titolo')
        } else {
            setPostError('')
        }
        setPosts(filteredPosts);
    };

    const handleCategoryFilter = (e) => {
        setCategoryFilter(e.target.value)
    }

    async function getAllPosts(){
        let response = await db.from('posts').select()
        setPosts(response.data);
    }

    setTimeout(() => setPostError(''), 4000)

    return (
        <div className="container">
            <br></br>
            
            <br></br>
            <form class='center'>
            <div>
                <Link style={{ textDecoration: 'none', color: 'white' }} to='/userPages/CreatePost'><button type="submit" className="c3-succ">Crea Nuovo Post</button></Link>

            </div>
            <br></br>
            <br></br>
                <input type="text" id="search" placeholder='Cerca' onChange={handleChangeSearch} /> &nbsp; &nbsp;
                <button type="button" className="c3-play" onClick={handleSearch}>Cerca</button> &nbsp; &nbsp;
                <button type="reset" className="c3-err" onClick={getAllPosts}>Reset</button>
            </form>
            {postError && <div className="text-danger">{postError}</div>}
            <br></br>
            <br></br>
            <select className="form-control" value={categoryFilter} onChange={handleCategoryFilter}>
                <option value="">--All--</option>
                <option value="Animali">Animali</option>
                <option value="Ambiente">Ambiente</option>
                <option value="Attualità">Attualità</option>
            </select>


            {posts.filter(post => categoryFilter === '' || post.category === categoryFilter).map(post => (
                <div className="card" style={{ margin: '20px 0' }}>
                    <div className="card-body">
                        <div key={post.id}>
                            <ForumImage url={post.image} size={200}/>
                            <h2 className="card-title">{post.title}</h2>
                            <p className="card-text">{post.content}</p>
                            <p className="card-text" style={{textAlign:'center'}}>Categoria: {post.category}</p>
                            <p className ="card-text" style={{textAlign:'right'}}><i>Autore: {post.author}</i></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default Forum;