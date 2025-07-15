const fs = require('fs');
const slugify = require('slugify')

const generateRandomString = (len = 100) => {
    const chars = "0123456789abcdefghijklmnopqrstvuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = chars.length;
    let randomStr = "";
    for(let i = 1; i<=len; i++){
        const posn = Math.ceil(Math.random() * (length - 1))
        randomStr += chars[posn]
    }
    return randomStr

}


fileDelete = (path) =>{
    if(fs.existsSync(path)){
        return   fs.unlinkSync(path)
    }
    return false;


}




module.exports = {
    generateRandomString,
    fileDelete,

}