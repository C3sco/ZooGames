import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from '../components/Database.js';
import { Link } from 'react-router-dom'
import './forum.css'

const db = supabase

const Forum = ({ session }) => {
    const [posts, setPosts] = useState([])

    const [categoryFilter, setCategoryFilter] = useState('')
    // const [successAlert, setSuccessAlert] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const posts = await db.from('posts').select().order('created_at', true)
            setPosts(posts.data)
        }
        fetchData()
    }, [])

    const handleCategoryFilter = (e) => {
        setCategoryFilter(e.target.value)
    }

    // setTimeout(() => setSuccessAlert(''), 10000)

    return (
        <div className="container">
            <br></br>
            <div class="center">
                <Link to='/userPages/CreatePost'><button type="submit" className="btn btn-primary" >Crea Nuovo Post</button></Link>
            </div>
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
                            <img src={post.image_url} alt={post.title} />
                            <h2 className="card-title">{post.title}</h2>
                            <p className="card-text">{post.content}</p>
                            <p className="card-text">Categoria: {post.category}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default Forum;