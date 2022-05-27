// api/projects.js

import apiUrl from "../apiConfig"
import axios from "axios"

// Index function
export const getAllProjects = () => {
    return axios(`${apiUrl}/projects`)
}

// Show function
export const getOneProject = (projectId) => {
    return axios(`${apiUrl}/projects/${projectId}`)
}

// Create function
export const createProject = (user, newProject) => {
    console.log("user:", user)
    console.log("new project:", newProject)
    return axios({
        url: `${apiUrl}/projects`,
        method: "POST",
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { project: newProject }
    })
}
