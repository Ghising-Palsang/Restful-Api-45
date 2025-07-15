const {Sequelize} = require("sequelize")
const { sqlConfig } = require('./config')



const sequelize = new Sequelize(sqlConfig.dbName, sqlConfig.user, sqlConfig.password, {
    host: sqlConfig.host,
    port: sqlConfig.port,
    dialect: `${sqlConfig.dialect}`
});

(async()=>{
    try{
       await sequelize.authenticate()
       console.log( "***** SQL SERVER CONNECTED ******" )
    }catch(exception){
        console.log("exception",exception)
    }
})()

module.exports = sequelize