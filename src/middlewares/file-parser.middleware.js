const fs = require("fs");
const multer = require("multer");

const uploader = (type = 'image') => {
  // storage config
  const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const path = "./public/uploads";

      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });


  const allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'svg','webp','bmp','jfif'];
  let fileSize = 3000000; // 3MB

if(type === 'doc'){
    allowedExt = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'json'];
    fileSize = 5000000; // 5MB
}

// TODO: add more types and their allowed (extensions and file sizes) which are called validation rule

  // file filter
  const filefilter = (req, file, cb) => {
    // a.jpg => 'a.jpg'.split('.') => ['a', 'jpg'].pop() => 'jpg'
    const ext = (file.originalname.split(".")).pop()
    if(allowedExt.includes(ext.toLowerCase())){
      cb(null, true); // file is allowed
  }else{
    cb({
        code: 422,
        message: `File type not allowed. Allowed types are ${allowedExt.join(', ')}`,
        name: "FILE_UPLOAD_ERROR"
    })
  };
 
}

 return multer({
    storage: myStorage,
    fileFilter: filefilter,
    limits: {
        fileSize: fileSize, 
    }    
  });
}
module.exports = uploader;
