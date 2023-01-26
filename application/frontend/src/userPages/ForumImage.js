import { useEffect, useState } from 'react'
import { supabase } from '../components/Database.js'
import '../buttons.css'

export default function PostImage({ url, id, size, onUpload }) {
    const [postUrl, setPostUrl] = useState(null)
    
    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('posts').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setPostUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return (

        <div style={{ width: size }} aria-live="polite">
            <br></br>
            <img
                src={postUrl ? postUrl : `https://place-hold.it/${size}x${size}`}
                alt={postUrl ? 'Post' : 'No image'}
                className="post image"
                style={{ height: size, width: size }}
            />
        </div>
    )
}