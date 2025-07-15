require('dotenv').config();

const MongoDbConfig = {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017',
    dbName: process.env.MONGODB_DB_NAME,
}

const CloudinaryConfig = {
    cloudName:process.env.CLOUDINARY_CLOUD_NAME,
    apiKey:process.env.CLOUDINARY_API_KEY,
    apiSecret:process.env.CLOUDINARY_API_SECRET,
}

const SmtpConfig = {
    provider: process.env.SMTP_PROVIDER,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM,
}


const AppConfig = {
    feUrl: process.env.FRONTEND_URL,
    jwtSecret: process.env.JWT_SECRET,
}

const KhaltiConfig = {
    baseUrl: process.env.KHALTI_END_POINT,
    secretKey: process.env.KHALTI_SECRET_KEY,
}

const sqlConfig = {
    dialect: process.env.SQL_SERVER,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    dbName: process.env.SQL_DBNAME,
   
}


module.exports = {
    MongoDbConfig,
    CloudinaryConfig,
    SmtpConfig,
    AppConfig,
    KhaltiConfig,
    sqlConfig
    
};