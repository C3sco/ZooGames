import { useEffect, useState } from 'react'
import { supabase } from '../components/Database.js'

export default function ProfileImage({ url, id, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

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
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? 'Avatar' : 'No image'}
        className="avatar image"
        style={{ height: size, width: size }}
      />
      
      {uploading ? (
        'Uploading...'
      ) : (
        <><br></br><br></br>
          <label className="button primary block" htmlFor="single"><button className="btn">
          Carica immagine
          </button>
          </label>
          <div className="visually-hidden">
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </div>
        </>
      )}
    </div>
  )
  /*
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url,id)
  }, [url])

  async function downloadImage(url,id) {
    try {
      const { data, error } = await supabase.storage.from('images').download(id+"/")  //list(id + "/", {limit:1,offset:0,sortBy:{column:"name",order:"asc"}}) //.download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
      // await supabase.from('users').update({image:url}).eq(id,id)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Devi selezionare un\' immagine')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { data,error: uploadError } = await supabase.storage.from('images').upload(id + "/",file)

      // let { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // onUpload(filePath)
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
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? 'Avatar' : 'No image'}
        className="avatar image"
        style={{ height: size, width: size }}
      />
      {uploading ? (
        'Uploading...'
      ) : (
        <>
          <label className="button primary block" htmlFor="single">
            Cambia immagine (CLICK)
          </label>
          {/* <Form.Group className="mb-3" style={{maxWidth:"500px"}}>

          </Form.Group> }
          <div className="visually-hidden">
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </div>
        </>
      )}
    </div>
  )*/
}