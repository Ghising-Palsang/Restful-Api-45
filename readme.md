# Package.json
  - Dependency manager 
  - library or files or modules which is required by this project
  -   
  ```json
    a. Dependency 
      - required only by this project 
    b. Global Dependency 
      - required by any project within the server/device 
    c. Dev Dependency
      - Only required for development but not for production
  ```
  - Version Defintion or Project definition 

  ## Root Directory / Working Directory =====> api-45

  ### Steps for project setup
    - Setup the git repo
    - Clone the git repo
    - Setup node js
      - npm init -y
    - git checkout -b branchname  
    - Push the code to git
      - git add .
      - git commit -m 'm'
      - git push origin branchname


### Dependency Setup Commands
- Setup Dependency
  - npm install <package name> --save

-Setup Global Dependency
  - npm install <package name > -g

- Setup Dependency Setup
  - npm install <package name > --save-dev/-d

- To unistall Dependency
  - npm uninstall <package name>


### Node project / API Server / REST API
- HTTP base TCP / IP protocol
- Web Services communication
- Handshaking protocol
    phone call
- Representational Stateless Transfer
- Clint  - Server Architecture
  - Clint request ===> Server Respond to the client
  - Except RTC (Real Time Application ===> Chat Application => Bi directional communication(Socket programming/ Web socket))


### Response Sending Methods
  - res.send('hello world') => returns in xml format
  - res.end('hello world')
  - res.sendFile('/C:Users/desktop....') => takes full file path and sends the file on reload
  - res.render('./html.index')
  - res.download('./index.html')
  - res.redirect('http:/google.com') => redirects to google homepage
  - res.sendDate(true)
  - res.status(400).json()



## Features
  - Authorization and Authentication
    - Registration
      - single route post => register
  - Activation (Optional)
    - OTP, link click  => post/get => /activate
  - Login
    - post /login
  - Logout
    - get/post /logout
  - Forgot Password request 
    post /forgot-password
  -Verification 
    - get /verify-forgot-password-link
  - Reset Password 
    - post /password-reset 
  - Profile Access
    - get /me
    
  - Brand Data
    - CRUD
  - Category
    - CRUD
  - Users
    - CRUD
  - Product
    - CRUD + others
  - Orders
    - CRUD 

### Middleware and controller 

### Validation
  - Packages
    - joi, yup, ajv, zod, class validator, superStruct


### Middleware Validation - bodyValidator
  - validation (3 levels of validation FE, BE & DB)
  - Custom rules
  - package based

### Password Encryption in DB
  -  md5, shal, bcrypt (blowfish algorithm), scrypt, argon2  => Hashing functions or algorithm

## Token (benkyo)
 JWT.io , openID jwt => RFC => what are needed? (written) => exp i.e. expiry => these are reserved claimed names.
 adopted by REST APIs => these are formats

 SSO => single signing options => flows? what is it?
 major platform => cognito(AWS) , keyclock(redhat), google(used by cloud auth, google workspace), okta(.net), 
 auth0 => mostly used SSO


 ### Database 
  - Relational database
    - SQL database(php)
    - mariadb(php), postgres(node), oracle(fintech), mssql(.net, microsoft)
  - Non relational database
    - MongoDb(node)
    - couchdb
    - cassendra


  ### DB Access:
  ** Atlas Server Access **
  username : api-45
  password : YbNNUV9uXXn93BRL

  ** Local Server **
  - protocol: mongodb/ mongodb+srv(atlas)
  - host: localhost/127.0.0.1 or cluster url
  - port no: 27017
  - Auth: username/password only for atlas access
  - url => protocol://user:password@host:port/dbname?options
  - 'local: mongodb://127.0.0.1:27017/<dbname> '
  - Atlas shell url
    - mongosh "mongodb+srv://personal-db.dnusln5.mongodb.net/" --apiVersion 1 --username api-45

### DB Server Usages:
  - CRUD

a. Setup Database:
  - To create and select or select existing db from cluster
    - use <dbname i.e mern-45>

b. To view current database:
  - db  

c. To list all the tables(collections)
  - show tables

  - db.getCollectionInfos()
  - db.getCollectionNames() => list collection of name as array      

### CRUD
a. Create
- Data create
  - db.<collectionName>.insertOne(json object)  
  - db.<collectionName>.insertmany(array of json objects)


b. Read
- Data read
  - db.<collectionName>.find(filter, projection, options)
  - db.<collectionName>.findOne(filter, projection, options)
  - for e.g:
    - db.users.find({role: "seller"},{name: 1, email: 1, _id: 0},{sort:{name:"asc/desc"},limit:3,skip:0})
    - projection lets you fetch name and email row only. 
    - limit fetch data upto how many is set and from that limit skip is defined like if skip is 1 first one
    - will be skipped. and so on

c. Update
- Data update
  - db.<collectionName>.updateOne(filter, {$set: dataAsJson}, options)  
  - db.<collectionName>.updateMany(filter, {$set: dataAsJson}, options)  
  - findOneAndUpdate
  - for e.g :
    - db.users.updateOne({_ id:ObjectId('')},{$set:{email:""}}.{upsert: true})
    - upsert default is false
    - upsert is a special option used in update operations. It stands for:
      - "update if exists, insert if it doesn't"
        - When you use upsert: true, MongoDB will:
        - Update the document if it matches the filter.
        - Insert a new document if no matching document is found.

d. Delete
- Data delete
  - db.<collectionName>.deleteOne(filter)
  - db.<collectionName>.deleteMany(filter)
  - for e.g:
    - db.users.deleteOne({id_:ObjectId('')})



### Operators in filter parameter

- {age: {$gt:28}}
- {$gt:} -> greater than
- {$gte:} -> greater than or equal to
- {$lt:} -> less than
- {$lte:} -> less than or equal to
- {$or:}
- {$and:}
- {$eq:} -> equals to
- {$ne:} -> not equal to


### Usages of database
- Relational DB (SQL):
  - e.g. mysql, mariadb, postgress, mssql
  - ORM 
    * Sequelize, typeorm, prisma

- Non-relational DB (NoSql):
  - e.g mongodb, cassendra, couchdb, etc.
  - ODM:
    * mongodb --> mongoose


### ORM or ODM
1. (ODM- Skip) Create a database
2. (ODM- Skip) Generate a migration for your table.
  - ORM feature class that defines the structure of out table
3. Connect with database 
  - host, user, port, password, dbName -> these are confidential data so we should make it private for
  - which we create environment in our server
4. Develop a model class 
  - Model name singular followed by StudlyCaps / Pascal
    - for e.g. table -> users -----> model -> User
  - Table properties are the keys for a model instance 
    - for e.g. users table(_id, name, email.....)
    - User (_id, name, email.....)
  - Every row is represented by an instance of a model class
5. Query are always done through the model class



### Entity
 - data definition
- e.g. user -> attibutes/properties


**Product Entity**
- brand , category, product


**Order and Cart**
- Cart ===> Order Detail ==> Cart to Order


### Sql Database
  - mysql, mariadb, postgres 


  - ORM:
    -  sequelize 

  - pg userName: postgres
  - pg password: 123456
  - port : 5432

  - npm i sequelize pg pg-hstore