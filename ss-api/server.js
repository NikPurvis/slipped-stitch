// server.js

// NPM package dependancies
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

// Middleware dependencies
const errorHandler = require("./lib/error_handler")
const replaceToken = require("./lib/replace_token")
const requestLogger = require("./lib/request_logger")

// Route dependencies
const userRoutes = require("./app/routes/user_routes")
const projectRoutes = require("./app/routes/project_routes")

// Database configuration
// "db" will be the actual MongoDB URI as a string
const db = require("./config/db")
// Configured passport authentication middlware
const auth = require("./lib/auth")

// Define server and client ports
// Used for cors and local port declaration
const serverDevPort = 8000
const clientDevPort = 3000

// Establish database connection
mongoose.connect(db, {
    useNewUrlParser: true,
})

// Instantiate Express application object
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

// Makes it so client can use Rails convention of "Authorization: Token token=<token>" or Express convention of "Authorization: Bearer <token>"
app.use(replaceToken)

// Register Passport authenticaion
app.use(auth)

// Will parse JSON requests into JS objects before they reach the route files
app.use(express.json())

// Parses requests sent by `$.ajax`, which uses a different content type
app.use(express.urlencoded({ extended: true }))

// Log each request as it comes in for debugging
app.use(requestLogger)


// Route registration
app.use(userRoutes)
app.use(projectRoutes)

// Error handling middleware
// Note this comes after the route registration because they will pass it error messages
app.use(errorHandler)


// Run API on designated port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// Initial setup test
app.get("/", (req, res) => res.send("Hello world!"))


// Needed for testing
module.exports = app
