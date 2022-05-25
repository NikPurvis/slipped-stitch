// components/projects/IndexProjects.js

import React, { useState, useEffect } from "react"
import { getAllProjects } from "../../api/projects"

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

    let projectsJsx

    if (projects.length > 0) {
        projectsJsx = projects.map(project => (
            <li key={project.id}>
                {project.name}
            </li>
        ))
    }

    return (
        <>
            <h3>All Projects</h3>
            <ul>
                {projectsJsx}
            </ul>
        </>
    )
}

export default IndexProjects
