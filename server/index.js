const express = require("express")
const app = express()
const {cloudinary} = require("./services/cloudinary.services")
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb", extended:true}))

app.post("/api/upload", async(req, res)=>{
    try {
        const file = req.body.data
        const uploadedResponse = await cloudinary.uploader.upload(file, {
            upload_preset:"image-box"
        })
        console.log(uploadedResponse)
        res.json({status:"success", msg:"file uploaded successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:error.message, status:"failed"})
    }
})

const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log("cloudinary testing server open")
})