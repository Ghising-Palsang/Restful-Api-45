const CloudinaryService = require('./cloudinary.service');

class FileUploadService{
    svc;
    constructor(){
        this.svc = new CloudinaryService();
    }
}

const fileUploadSvc = new FileUploadService();

module.exports = fileUploadSvc; 