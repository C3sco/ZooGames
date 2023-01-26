import { useEffect, useState } from 'react'
import { supabase } from '../components/Database.js'
import '../buttons.css'

export default function ProductImage({ url, id, size, onUpload }) {
    const [productUrl, setProductUrl] = useState(null)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('products').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setProductUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return (

        <div style={{ width: size }} aria-live="polite">
            <br></br>
            <img
                src={productUrl ? productUrl : `https://place-hold.it/${size}x${size}`}
                alt={productUrl ? 'Product' : 'No image'}
                className="product image"
                style={{ height: size, width: size,  borderColor:'black', borderWidth:'2px'}}
            />
        </div>
    )
}