// components/projects/IndexProjects.js

import React, { useState, useEffect } from "react"
import { getAllProjects } from "../../api/projects"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

// Declare a style object to corral the Project cards
const cardContainerLayout = {
    display: "flex",
    justifyContent: "center",
    flexFlow: "row wrap"
}

const IndexProjects = (props) => {
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        getAllProjects()
            .then(res => {
                setProjects(res.data.projects)
            })
            .catch(console.error)
    }, [])

    if (!projects) {
        return <p>Loading...</p>
    } else if (projects.length === 0) {
        return <p>No projects, go add some!</p>
    }

    let projectCards

    if (projects.length > 0) {
        projectCards = projects.map(project => (
            <Card key={project.id} style={{ width: "30%" }} className="m-2">
                <Card.Header>{project.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/projects/${project._id}`}>
                            View {project.name}
                        </Link><br />
                        {project._id}<br />
                        {project.description}<br />
                        {project.type}<br />
                        {project.skill}<br />
                        {project.notes}<br/>
                        {project.owner.username}
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
        
        
    }

    return (
        <>
            <h3>All Projects</h3>
            <div style={cardContainerLayout}>
                {projectCards}
            </div>
        </>
    )
}

export default IndexProjects
