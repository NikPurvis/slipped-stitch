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
