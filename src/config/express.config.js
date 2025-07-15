
const express = require("express"); // importing express from package
const router = require("./router.config");
require("./mongodb.config"); // importing mongodb config file to connect with mongodb
require('./sql.config')
const cors = require("cors");
const helmet = require("helmet")
const {rateLimit} = require("express-rate-limit")

const app = express(); // creaeubg express application
app.use(cors()); 

// const corsOptions = {
//   origin: "*",
//   // methods: ["GET","POST","PUT","DELETE"]
// }

// //cors load
// app.use(cors(corsOptions))
// app.options(
//   "/*",
//   // cors(corsOptions)
// ) // preflight

// what is handshake, sanitization, helmet package for xss(sanitization).

// xss - cross site scripting 
app.use(helmet())

// limit - api load limit
app.use(rateLimit({
  windowMs: 60000, // 60000 milisecond is 1 minute. In one minute 30 api call is allowed.
  limit: 30
}))

// Configure the Content-Security-Policy header.
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         "script-src": ["'self'", "example.com"],
//       },
//     },
//   }),
// );



// // parsers
// app.use(express.json()); // to parse into json format
// app.use(express.urlencoded()); // to parse url

// //middleware
// app.use((req, res, next) => {
//   console.log("I am a application level middleware"); // runs on all the routers
//   next();
// });

//  serves static file like images, CSS ,js from folder to server+

app.use(express.json());
app.use("/assets", express.static("./public"));

app.use("/api/v1", router); //router mount

// 404
app.use((req, res, next) => {
  next({
    code: 404,
    message: "Resource_Not_Found",
    name: "Not_Found",
  });

  // res.status(404).json({
  //     error:null,
  //     message: ' Resource not found ',
  //     status:'Not_Found',
  //     options:null
  // })
});

//error handling middleware
app.use((error, req, res, next) => {
  let responseCode = error.code || 500;
  let detail = error.detail || null;
  let msg = error.message || "Internal Server error....";
  let status = error.name || "Application error...";

  // TODO : ongoing process

  if (error.name === "MongoServerError") {
      responseCode = 400;
      detail = {},
      msg = "Unique Validation Failed"
      status = "VALIDATION_FAILED"

       //Unique failed
    if (+error.code === 11000) {
      Object.keys(error.keyPattern).map((field) => {
        detail[field] = `${field} should be unique`;
      });
    }
  };

   

  res.status(responseCode).json({
    error: detail,
    message: msg,
    status: status,
    options: null,
  });
});

module.exports = app; // exporting express application
