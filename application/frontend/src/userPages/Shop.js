import { supabase } from '../components/Database.js';
import React, { useState, useEffect } from 'react';
import './shop.css'
import { Link } from 'react-router-dom';


export default function Shop() {
    const db = supabase;
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [productError, setProductError] = useState('');
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

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

    async function getProducts(){
        let response = await db.from('products').select()
        setProducts(response.data);
    }

    function addToCart(product) {
        setCart([...cart, product]);
    }

    function removeFromCart(product){
        setCart(cart.filter((item) => item.id !== product));
    }

    return (
        <>
        <h1>CATALOGO</h1>
        <form class='center'>
                <input type="text" id="search" onChange={handleChangeSearch} /> &nbsp; &nbsp;
                <button type="button" className="c3-play" onClick={handleSearch}>Cerca</button> &nbsp; &nbsp;
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
                        <button className='cardBtn' onClick={async() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <br></br><br></br>
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
        </>
    );
}