// components/projects/ShowProject.js

import React, { useState, useEffect } from "react"
import { getOneProject } from "../../api/projects"
import { useParams } from "react-router-dom"
import { Spinner, Container, Card } from "react-bootstrap"

const ShowProject = (props) => {

    const [project, setProject] = useState(null)
    console.log("Props in showProject:", props)
    const { id } = useParams()
    console.log("id in showProject:", id)
    // Empty dependency array in useEffect acts like component did mount
    useEffect(() => {
        getOneProject(id)
            .then(res => setProject(res.data.project))
            .catch(console.error)
    }, [id])

    if (!project) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{project.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>descr: {project.description}</small><br />
                        <small> notes: {project.notes}</small><br />
                        <small>skill: {project.skill}</small><br />
                        <small>
                            Completed: {project.completed ? "yes" : "no"}
                        </small>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ShowProject
