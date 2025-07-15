const { CloudinaryConfig } = require('../config/config');
const { fileDelete } = require('../utilities/helpers');

const cloudinary = require('cloudinary').v2;

class CloudinaryService {
    constructor(){
        cloudinary.config({
            cloud_name: CloudinaryConfig.cloudName,
            api_key: CloudinaryConfig.apiKey,
            api_secret: CloudinaryConfig.apiSecret,
        })
    }

    fileUpload = async(filepath, dir='') =>{
        try{
            const {public_id, secure_url} = await cloudinary.uploader.upload(filepath,{
                unique_filename: true,
                folder:'/api-45'+ dir,
            })

            fileDelete(filepath); // delete the file from local storage after upload 

            const imageUrl = cloudinary.url(public_id,{
                transformation:[
                    { width: 1024, height:1024, crop: 'scale' },
                    {format:'auto'},
                    // {flags:'layer_apply',width:100, gravity:'center',y:15,x:-20, crop:'sclae'},
                     {overlay:{font_family:'cookie',font_size:23,font_weight:'bold',text:'Hello sekai'},color:'#744700'},
                    // {flags:'layer_apply',x:-23,y:50},
                   
                ]
            })
            return{
                publicId:public_id,
                publicUrl: secure_url,
                thumbUrl: imageUrl,
            }
        }catch(exception){
            console.error(exception);
            throw exception;
        }
    }

}

module.exports = CloudinaryService