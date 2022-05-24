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
// SHOW
// GET - retrieve a comment
router.get("/projects/:projectId/:commentId", (req, res, next) => {
    const projectId = req.params.projectId
    const commentId = req.params.commentId
    Project.findOne(
        { "_id": ObjectId(projectId) },
        { "comments": {
            $elemMatch: { _id: ObjectId(commentId) }}
        }
    )
    .populate({
        path: "comments",
        populate: {
            path: "owner",
            model: "User"
        }
    })
    .then(handle404)
    .then(project => res.status(200).json({
        project: project.toObject() }))
    .catch(next)
})

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

// UPDATE
// PATCH - edit a specific comment
// ** Work in comment owner validation **
router.patch("/projects/:projectId/:commentId", requireToken, removeBlanks, (req, res, next) => {
    // Prevent client from changing comment owner
    delete req.body.owner
    const currentUser = req.user.id
    const projectId = req.params.projectId
    const commentId = req.params.commentId
    const commentUpdate = req.body.comment.text

    // ********get comment owner _id to compare

    Project.updateOne({
        "_id": ObjectId(projectId)
    },{
        $set: {
            "comments.$[comments].text": commentUpdate
        }
    },{
        "upsert": false,
        "new": true,
        arrayFilters: [
            {
                "comments._id": {
                    "$eq": ObjectId(commentId)
                }
            }
        ]
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})


// REMOVE
// Delete - delete comment
router.delete("/sightings/:sightingId/:commentId", requireToken, (req, res, next) => {
    const sightingId = req.params.sightingId
    const commentId = req.params.commentId
    Sighting.updateOne({
        "_id": ObjectId(sightingId),
        "comments": {
            $elemMatch: { _id: ObjectId(commentId) }
        }
    },{
        $pull: {
            "comments": { "_id": commentId }
        }
    },{
        new: true,
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// 
/////////////////////
// End Routes
/////////////////////

module.exports = router
