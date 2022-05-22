// server.js

// NPM package dependancies
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { append } = require("express/lib/response")

// Middleware
// ***MIDDLEWARE TO GO HERE**

// Route files
// ***ROUTES TO GO HERE** 



// Define server and client ports
// Used for cors and local port declaration
const serverDevPort = 8000
const clientDevPort = 3000

// instantiate express application object
const app = express()

// Set CORS headers on response from this API using the "cors" NPM package
// CLIENT_ORIGIN is an environment variable that will be set on Heroku
app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
	})
)

// Define port for API to run on
// Adding PORT= to .env file will be necessary for deployment
const port = process.env.PORT || serverDevPort

// Run API on designated port
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})



app.get("/", (req, res) => res.send("Hello world!"))

// Needed for testing
module.exports = app
