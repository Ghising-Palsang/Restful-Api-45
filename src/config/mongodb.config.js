const mongoose = require('mongoose');
const { MongoDbConfig } = require('./config');



(async()=>{
    try {
        await mongoose.connect(MongoDbConfig.url, {
        dbName: MongoDbConfig.dbName,
        autoCreate: true,
        autoIndex: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
})()
