import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import "dotenv/config"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SCRET,
})

const uploadOnCloudinary = async(filepath) => {
    try {
        if(!filepath){
            return null
        }

        const response = await cloudinary.uploader.upload(filepath, {resource_type:"auto"})
        return response

    } 
    catch (error) {
        fs.unlinkSync(filepath) //remove locally saved image from "public" folder as upload operation failed on cloudinary
        return null
    }
}

export {uploadOnCloudinary}