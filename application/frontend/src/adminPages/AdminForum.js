import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from '../components/Database.js';
import '../buttons.css'
import ForumImage from '../userPages/ForumImage.js';

const db = supabase

export default function AdminForum({ session }){
    const [posts, setPosts] = useState([])
    const [categoryFilter, setCategoryFilter] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const posts = await db.from('posts').select().order('created_at',{ascending:false} )
            setPosts(posts.data)
        }
        fetchData()

    }, [])

    const handleCategoryFilter = (e) => {
        setCategoryFilter(e.target.value)
    }

    const deletePost = async(id) => {
        try {
            console.log(id)
            await supabase.from('posts').delete().eq('id',id);
            db.from('posts').select().then((response) => {
                setPosts(response.data);
            });

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            
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
                            <p className="card-text">Categoria: {post.category}</p>
                            <button className='c3-err' onClick={() => deletePost(post.id)}>Elimina</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}