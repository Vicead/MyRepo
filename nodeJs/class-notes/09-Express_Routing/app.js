"use strict";

const { clear } = require("console");
/* -------------------------------------------------------------------------- 

    EXPRESS FRAMEWORK 

/* -------------------------------------------------------------------------- */
// console.log("Welcome to Express")

/* ExpressJS Start */
// $ npm i express

const express = require("express");
const app = express(); // Run applcation on express

/* ENV */
// $ npm i dotenv

require("dotenv").config();
// console.log(process.env) // GLOBAL ENV
// console.log(process.env.PORT)
// const PORT = process.env.PORT ?? 8000
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "127.0.0.1";

/* -------------------------------------------------------------------------- */
// HTTP_Methods & Paths:

// app.get("/", (req, res) => {
//   // res.write("Hello");
//   //   res.write(JSON.stringify({
//   //     message: "Hello"
//   //   }))
//   //   res.end();
//   //res.send("Hello")
//   res.send({
//     message: "Hello"
//   })
// });
// app.post('/', (req, res) => res.send({ message: "called in 'post' method."}))
// app.put('/', (req, res) => res.send({ message: "called in 'put' method."}))
// app.delete('/', (req, res) => res.send({ message: "called in 'delete' method."}))

//? allow at all methods:
// app.all('/', (req, res) => res.send({ message: "'all' option allows to all methods."}))

/* -------------------------------------------------------------------------- */
//? Route Method:
// app
//   .route("/")
//   .get((req, res) => res.send("GET method runned."))
//   .post((req, res) => res.send("POST method runned."))
//   .put((req, res) => res.send("PUT method runned."))
//   .delete((req, res) => res.send("DELETE method runned"))

/* -------------------------------------------------------------------------- */
//? URL (path) Options:
// app.get("/", (req,res) => res.send({message: "in root"})) // "/" == root
// app.get("/path", (req,res) => res.send({message: "in /path"})) 
// app.get("/a/b/c", (req,res) => res.send({message: "in /a/b/c"})) 
//? express-urls supported JokerChar:
//app.get("/abc(x?)123", (req, res) => res.send({message: "in /abc(x?)123"})) //abc123 or abcx123
//app.get("/abc(x+)123", (req, res) => res.send({message: "in /abc(x+)123"})) //abcx123 or abcx..x123 (min 1 x)
//app.get('/abc123*', (req, res) => res.send("in 'abc123*'")) // abc123 or abc123... // abc123(ANY)
//app.get('/abc*123', (req, res) => res.send("in 'abc*123'")) // abc123 or abc...123 // abc(ANY)123

/* -------------------------------------------------------------------------- */
/* Express RunServer */
app.listen(PORT, HOST, () => console.log(`Server: http://${HOST}:${PORT}`));
