import { useEffect, useState } from 'react'
import { supabase } from '../components/Database.js'
import '../buttons.css'

export default function PostImage({ url, id, size, onUpload }) {
    const [postUrl, setPostUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

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

    const uploadPost = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError } = await supabase.storage.from('posts').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
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