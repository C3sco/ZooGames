import { supabase } from '../components/Database.js';
import React, { useState, useEffect } from 'react';
import './shop.css'
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.js';


export default function Shop() {
    const db = supabase;
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [productError, setProductError] = useState('');
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('')

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
        if (filteredProducts.length == 0) {
            setProductError('Impossibile trovare un prodotto con questo nome')
        } else {
            setProductError('')
        }
        setProducts(filteredProducts);
    };

    async function getProducts() {
        let response = await db.from('products').select()
        setProducts(response.data);
    }

    function addToCart(product) {
        setCart([...cart, product]);
    }

    function removeFromCart(product) {
        setCart(cart.filter((item) => item.id !== product));
    }

    const handleCategoryFilter = (e) => {
        setCategoryFilter(e.target.value)
    }

    return (
        <>
        <div className='cart'>
                <h2>Carrello</h2>
                <Link to='../userPages/Checkout' cart={cart}><button className='btn-checkout'>Checkout</button></Link>
                <ul>
                    {cart.map((product) => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
                            <button className='btn-remove' onClick={() => removeFromCart(product.id)}>Rimuovi</button>
                        </li>
                    ))}
                </ul>
            </div>
            <br></br>
            <h1>CATALOGO</h1>
            <form class='center'>
                <input type="text" id="search" placeholder='Cerca' onChange={handleChangeSearch} /> &nbsp; &nbsp;
                <button type="button" className="c3-play" onClick={handleSearch}>Cerca</button> &nbsp; &nbsp;
                <button type="reset" className="c3-err" onClick={getProducts}>Reset</button>
            </form>
            <br></br>
            {productError && <div className="text-danger">{productError}</div>}
            <br></br>
            <select className="form-control" value={categoryFilter} onChange={handleCategoryFilter}>
                <option value="">--All--</option>
                <option value="Cibo">Cibo</option>
                <option value="Giochi">Giochi</option>
                <option value="Animali">Animali</option>
            </select>

            <div className='shop-page'>

                {products.filter(product => categoryFilter === '' || product.category === categoryFilter).map(product => (
                    <div class='card-shop' key={product.id}>
                        <ProductImage url={product.image} size={290} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p class='price'>{product.price} €</p>
                        <p><i>{product.category}</i></p>
                        <button className='cardBtn' onClick={async () => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            
            
        </>
    );
}