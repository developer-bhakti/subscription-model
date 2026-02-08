// import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";

import ProjectCard from "../Components/ProjectCard"


// import React from 'react'

const Projects = () => {


  return (
    <>
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </>
  )
}

export default Projects
//     <div>{projectsData.map((project) => (
//   <Link
//     key={project.id}
//     to={`/projects/${project.id}`}
//     className="group"
//   >
//     <div className="h-72 bg-neutral-200 rounded-lg overflow-hidden">
//       <img
//         src={project.images[0]}
//         alt={project.title}
//         className="w-full h-full object-cover group-hover:scale-105 transition"
//       />
//     </div>

//     <h3 className="mt-4 text-lg font-medium">
//       {project.title}
//     </h3>
//     <p className="text-sm text-neutral-600">
//       {project.location}
//     </p>
//   </Link>
// ))}</div>