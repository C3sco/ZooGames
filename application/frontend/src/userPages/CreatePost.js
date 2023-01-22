import React, { useState, useEffect } from 'react'
import { supabase } from '../components/Database.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../buttons.css'
import PostImage from './PostImage.js';

const db = supabase

const CreatePost = ({ session }) => {

    const id = session.user.id

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')

    const [successAlert, setSuccessAlert] = useState('')

    const [bodyError, setBodyError] = useState('')
    const [titleError, setTitleError] = useState('')
    const [categoryError, setCategoryError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (category === '') {
            setCategoryError('Perfavore seleziona una categoria')
            setBodyError('')
            setTitleError('')
            return
        } else if (title === '') {
            setTitleError('Perfavore inserisci un titolo')
            setCategoryError('')
            setBodyError('')
            return
        } else if (body === '') {
            setBodyError('Perfavore inserisci una descrizione')
            setCategoryError('')
            setTitleError('')
            return
        } else {
            setTitleError('')
            setBodyError('')
            setCategoryError('')
        }

        await db.from('posts').insert({ title: title, content: body, category: category, image: image})

        setTitle('')
        setBody('')
        setCategory('')
        setImage('')
        setSuccessAlert('Post creato con successo!')
    }

    setTimeout(() => setSuccessAlert(''), 10000)

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titolo</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                    {titleError && <div className="text-danger">{titleError}</div>}
                </div>
                <div className="form-group">
                    <label>Descrizione</label>
                    <textarea className="form-control" value={body} onChange={e => setBody(e.target.value)} />
                    {bodyError && <div className="text-danger">{bodyError}</div>}
                </div>
                <div className="form-group">
                    <label>Categoria</label>
                    <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value="Animali">Animali</option>
                        <option value="Ambiente">Ambiente</option>
                        <option value="Attualità">Attualità</option>
                    </select>
                    {categoryError && <div className="text-danger">{categoryError}</div>}
                </div>
                <br></br>
                <PostImage /* Richiama la classe ProfileImage in cui c'è il return del form, quindi bisogna modificare l'html di quello */
                    url={image}
                    id={id}
                    size={200}
                    onUpload={(url) => {
                        setImage(url)
                    }}
                />
                <br></br>
                <div class='line'>
                    <button type="submit" className="c3-succ">Crea Post</button>
                    <Link to='/userPages/Forum'><button type="button" className="c3-err">Indietro</button></Link>
                </div>
            </form>
        </div>
    )
}
export default CreatePost