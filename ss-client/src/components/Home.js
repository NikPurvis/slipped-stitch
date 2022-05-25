// components/Home.js

import IndexProjects from "./projects/IndexProjects"


const Home = (props) => {
	// const { msgAlert, user } = props
	console.log("Props in Home:", props)

	return (
		<>
			<h2>Home Page</h2>
			<IndexProjects />
		</>
	)
}

export default Home
