import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Upload = () => {
    const [previewSource, setPreviewSource] = useState('')
    const [fileInputState, setFileInputState] = useState('')
    const [selectdFile, setSelectedFile] = useState('')
    const handleOnFileChange = (e)=>{
        const file = e.target.files[0]
        previewFile(file)

    }

    const previewFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setPreviewSource(reader.result)
        }
    }

    const handleOnSubmit =(e)=>{
        e.preventDefault()
        if(!previewSource) return;
        uploadImage(previewSource);
    }

    const uploadImage = async(base64EncodedImage)=>{
        try {
            const resp = await axios.post("/api/upload", {data:base64EncodedImage}, {
                headers:{
                    "Content-Type":"application/json"
                }
            })
            console.log(resp.data)
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div>
        <form onSubmit={handleOnSubmit}>
        <input type="file" name="image" onChange={handleOnFileChange} value={fileInputState}/>
        <br/>
        <br/>
        <button type='submit'>upload</button>
        </form>
        {
            previewSource&& (
                <img src={previewSource} alt="preview" style={{height:"200px"}}/>
            )
        }
    </div>
  )
}

export default Upload
