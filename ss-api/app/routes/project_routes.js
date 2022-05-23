// routes/project_routes.js

// Import dependencies
const express = require("express")
const passport = require("passport")

// Import middleware
// Customizes certain errors
const customErrors = require("../../lib/custom_errors")
// Sends a 404 when a non-existent document is requested
const handle404 = customErrors.handle404
// Sends 401 error when user tries to access something they don't own
const requireOwnership = customErrors.requireOwnership
// Sets req.user and passes token when necessary for certain route access
const requireToken = passport.authenticate("bearer", { sesson: false })
// Removes blank fields from req.body
const removeBlanks = require("../../lib/remove_blank_fields")

// Import models
const Project = require("../models/project")

// Instantiate router
const router = express.Router()


/////////////////////
// Begin Routes
/////////////////////
// 
// CREATE
// POST - create new project
router.post("/projects", requireToken, removeBlanks, (req, res, next) => {
    // Bringing in requireToken gives us access to req.user
    req.body.project.owner = req.user.id

    Project.create(req.body.project)
        .then(project => {
            // Send a successful response on creation
            res.status(201).json({ project: project.toObject() })
        })
        .catch(next)
})
// 
/////////////////////
// End Routes
/////////////////////


module.exports = router
