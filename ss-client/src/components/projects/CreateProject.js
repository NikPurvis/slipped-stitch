// components/projects/CreateProject.js

import React, { useState } from "react"
import { Form, Container, Button, FormCheck } from "react-bootstrap"
import { createProject } from "../../api/projects"

// CreateProject renders a form and calls the createProject
// function from Axios (api/projects.js)
const CreateProject = (props) => {
    const { user } = props
    console.log("user in create:", user)
    // Two states are necessary
    const [project, setProject] = useState({
        name: "",
        type: "",
        skill: "",
        // patternLink: "",
        description: "",
        // dateStarted: "",
        completed: false,
    })
    console.log("project in create:", project)
    // An empty project object and a createId (to navigate)
    // Now handleChange and handleSubmit functions

    const handleChange = (e) => {
        // e === event
        e.persist()

        setProject(prevProject => {
            const name = e.target.name
            let value = e.target.value
            console.log("e.target type:", e.target.type)
            console.log("e.target checked:", e.target.checked)
            
            // If the form conveys a boolean value, let's enter it to the database that way.
            if(name === "completed" && e.target.checked) {
                value = true
            } else if (name === "completed" && !e.target.checked) {
                value = false
            }
            // If the form conveys a number, let's get it correctly in the db.
            if(e.target.type === "number") {
                value = parseInt(e.target.value)
            }
            
            const updatedValue = { [name]: value }

            console.log("prevProject", prevProject)
            console.log("updatedValue", updatedValue)

            return {...prevProject, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createProject(user, project)
            .then(res => {console.log("New Project:", res.data.project)})
            .catch(err => console.log(err))
    }

    return (
        <Container className="justify-content-center">
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    placeholder="Your project's name"
                    value={project.name}
                    name="name"
                    onChange={handleChange}
                />
                
                {/* Future dropdown list */}
                <Form.Label>Type</Form.Label>
                <Form.Control
                    placeholder="What this project creates"
                    value={project.type}
                    name="type"
                    onChange={handleChange}
                />

                {/* Future dropdown list */}
                <Form.Label>Skill</Form.Label>
                <Form.Control
                    placeholder="The project skill level"
                    value={project.skill}
                    name="skill"
                    onChange={handleChange}
                />

                <Form.Label>Description</Form.Label>
                <Form.Control
                    placeholder="Describe the project"
                    value={project.description}
                    name="description"
                    onChange={handleChange}
                />
                <FormCheck
                    label="Is this project completed?"
                    name="completed"
                    defaultChecked={project.completed}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CreateProject
