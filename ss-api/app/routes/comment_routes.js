// routes/comment_routes.js

// Import dependencies
const express = require("express")
const { ObjectId } = require("mongodb")
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
// POST - create a comment
router.post("/projects/:projectId/newcomment", requireToken, removeBlanks, (req, res, next) => {
    const comment = req.body.comment
    const projectId = req.params.projectId
    req.body.comment.owner = req.user.id

	Project.findById(projectId)
        .then(handle404)
        .then(project => {
            console.log("This is the project:", project)
            console.log("This is the comment:", comment)
            project.comments.push(comment)
            return project.save()
        })
        .then(project => res.status(201).json({ project: project }))
        .catch(next)    
})
// 
/////////////////////
// End Routes
/////////////////////

module.exports = router
