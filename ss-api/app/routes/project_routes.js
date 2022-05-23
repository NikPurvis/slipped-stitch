// routes/project_routes.js

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
const project = require("../models/project")

// Import models
const Project = require("../models/project")

// Instantiate router
const router = express.Router()


/////////////////////
// Begin Routes
/////////////////////
// 
// INDEX
// GET - all projects
router.get("/projects", (req, res, next) => {
    Project.find()
        .populate("owner")
        .then(projects => {
            // projects will be an array of Mongoose documents.
            // Map will return a new array, so we want to turn them into POJO (Plain Old JavaScript Objects)
            return projects.map(project => project.toObject())
        })
        .then(projects => res.status(200).json({ projects }))
})

// SHOW
// GET - individual project
router.get("/projects/:id", (req, res, next) => {
    Project.findById(req.params.id)
        .populate("owner")
        .then(handle404)
        // If successful, respond with the object as JSON
        .then(project => res.status(200).json({ project: project.toObject() }))
        // Otherwise, pass to error handler
        .catch(next)
})     

// SHOW
// GET - all projects from specific user
router.get("/projects/user/:id", (req, res, next) => {
    userId = req.params.id
    console.log("userid:", userId)
    Project.find({
        "owner": ObjectId(userId)
    })
    .then(handle404)
    .then(projects => res.status(200).json({ projects }))
    .catch(next)
})

// UPDATE
// PATCH - edit project
router.patch("/projects/:id", requireToken, removeBlanks, (req, res, next) => {
    // Prevent the client from changing the project owner
    delete req.body.owner
    Project.findById(req.params.id)
        .then(handle404)
        .then(project => {
            requireOwnership(req, project)
            return project.updateOne(req.body.project)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

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

// REMOVE
// DELETE - delete project
router.delete("/projects/:id", requireToken, (req, res, next) => {
    Project.findById(req.params.id)
        .then(handle404)
        .then(project => {
            requireOwnership(req, project)
            project.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})
// 
/////////////////////
// End Routes
/////////////////////


module.exports = router
