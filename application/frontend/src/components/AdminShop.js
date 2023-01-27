import { supabase } from '../components/Database.js';
import React, { useState, useEffect } from 'react';
import '../userPages/shop.css'
import AdminProcutImage from './AdminProductImage.js';


export default function AdminShop({session}) {
    const id = session.user.id
    const db = supabase;
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [productError, setProductError] = useState('');

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [successAlert, setSuccessAlert] = useState('')

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        supabase.from('products').select().then((response) => {
            setProducts(response.data);
        })
    }, []);

    const handleSearch = async () => {
        const allProducts = await db.from('products').select()
        const filteredProducts = allProducts.data.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
        console.log(filteredProducts);
        if (filteredProducts.length === 0) {
            setProductError('Impossibile trovare un prodotto con questo nome')
        } else {
            setProductError('')
        }
        setProducts(filteredProducts);
    };

    async function getProducts(){
        let response = await db.from('products').select()
        setProducts(response.data);
    }

    const deleteProduct = async(id) => {
        try {
            console.log(id)
            await supabase.from('products').delete().eq('id',id);
            db.from('products').select().then((response) => {
                setProducts(response.data);
            });

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await db.from('products').insert({ name: name, description: description, price:price, category: category, image: image})

        setName('')
        setDescription('')
        setCategory('')
        setPrice('')
        setImage('')
        setSuccessAlert('Post creato con successo!')
    }



    return (
        <><br></br>
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titolo</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Descrizione</label>
                    <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Prezzo</label>
                    <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Categoria</label>
                    <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value="Cibo">Cibo</option>
                        <option value="Giochi">Giochi</option>
                        <option value="Animali">Animali</option>
                    </select>
                </div>
                <br></br>
                <AdminProcutImage
                    url={image}
                    id={id}
                    size={200}
                    onUpload={(url) => {
                        setImage(url)
                    }}
                />

                <div class='line'>
                    <button type="submit" className="c3-succ">Aggiungi Prodotto</button>
                </div>
            </form>
        <h1>CATALOGO</h1>
        <form class='center'>
                <input type="text" id="search" placeholder='Cerca' onChange={handleChangeSearch} /> &nbsp; &nbsp;
                <button type="button" className="c3-play" placeholder='cerca' onClick={handleSearch}>Cerca</button> &nbsp; &nbsp;
                <button type="reset" className="c3-err" onClick={getProducts}>Reset</button>   
        </form>
        <br></br>
        {productError && <div className="text-danger">{productError}</div>}
        <br></br>
            <div className='shop-page'>
                {products.map((product) => (
                    <div class = 'card-shop' key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p class='price'>{product.price} €</p>
                        <p>{product.category}</p>
                        <button className='c3-err' onClick={async() => deleteProduct(product.id)}>Elimina</button>
                    </div>
                ))}
            </div>
            
        </>
    );
}