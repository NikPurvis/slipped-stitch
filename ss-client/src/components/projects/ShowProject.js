// components/projects/ShowProject.js

import React from "react"
import { getOneProject } from "../../api/projects"
import { useParams } from "react-router-dom"

const ShowProject = (props) => {
    console.log("Props in showProject:", props)
    const { params } = useParams()
    console.log("Params in showProject:", params)
    return (
        <p>Show project component</p>
    )
}

export default ShowProject
