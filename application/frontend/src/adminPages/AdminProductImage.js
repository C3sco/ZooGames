import { useEffect, useState } from 'react'
import { supabase } from '../components/Database.js'
import '../buttons.css'

export default function AdminProcutImage({ url, id, size, onUpload }) {
  const [productUrl, setProductUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

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

  const uploadProduct = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('products').upload(filePath, file)

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
        src={productUrl ? productUrl : `https://place-hold.it/${size}x${size}`}
        alt={productUrl ? 'Product' : 'No image'}
        className="product image"
        style={{ height: size, width: size }}
      />

      {uploading ? (
        'Uploading...'
      ) : (
        <><br></br><br></br>
          <label className="c3-wait" htmlFor="single">Carica Immagine</label>
          <div className="visually-hidden">
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadProduct}
              disabled={uploading}
            />
          </div>
        </>
      )}
    </div>
  )
}