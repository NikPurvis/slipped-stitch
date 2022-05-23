// routes/yarn_routes.js

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
const Yarn = require("../models/yarn")

// Instantiate router
const router = express.Router()


/////////////////////
// Begin Routes
/////////////////////
// 
// INDEX
// GET - all yarn
router.get("/yarn", (req, res, next) => {
    Yarn.find()
        // .populate("owner")
        // .then(yarn => {
        //     // yarn will be an array of Mongoose documents.
        //     // Map will return a new array, so we want to turn them into POJO (Plain Old JavaScript Objects)
        //     return yarn.map(yarn => yarn.toObject())
        // })
        .then(yarn => res.status(200).json({ yarn }))
        .catch(next)
})

// SHOW
// GET - individual yarn
router.get("/yarn/:id", (req, res, next) => {
    Yarn.findById(req.params.id)
        .populate("owner")
        .then(handle404)
        // If successful, respond with the object as JSON
        .then(yarn => res.status(200).json({ yarn: yarn.toObject() }))
        // Otherwise, pass to error handler
        .catch(next)
})     

// UPDATE
// PATCH - edit yarn
router.patch("/yarn/:id", requireToken, removeBlanks, (req, res, next) => {
    // Prevent the client from changing the yarn owner
    delete req.body.owner
    Yarn.findById(req.params.id)
        .then(handle404)
        .then(yarn => {
            requireOwnership(req, yarn)
            return yarn.updateOne(req.body.yarn)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// CREATE
// POST - create new yarn
router.post("/yarn", requireToken, removeBlanks, (req, res, next) => {
    // Bringing in requireToken gives us access to req.user
    req.body.yarn.owner = req.user.id

    Yarn.create(req.body.yarn)
        .then(yarn => {
            // Send a successful response on creation
            res.status(201).json({ yarn: yarn.toObject() })
        })
        .catch(next)
})

// REMOVE
// DELETE - delete yarn
router.delete("/yarn/:id", requireToken, (req, res, next) => {
    Yarn.findById(req.params.id)
        .then(handle404)
        .then(yarn => {
            requireOwnership(req, yarn)
            yarn.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})
// 
/////////////////////
// End Routes
/////////////////////


module.exports = router
