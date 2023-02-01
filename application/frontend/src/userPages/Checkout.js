import React, { useState } from 'react';
import './checkout.css'

function Checkout({cart, setCart}) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    console.log(cart);

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !address || !email || !phone) {
            alert('Perfavore riempi tutti i campi');
            return;
        }
        alert('Ordine piazzato con successo!');
        setCart([]);
    }

    return (
        <>
        <h1>Perfavore, completa i seguenti campi per completare l'acquisto</h1>
        <form className='checkout' onSubmit={handleSubmit}>
            <label>
                Nome:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Indirizzo:
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Telefono:
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </label>
            <button type="submit">Place Order</button>
        </form>
        </>
    );
}

export default Checkout;
