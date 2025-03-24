import React from "react";

const ProjectSection = ({ title, description, projects, removeProject }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      <p className="text-gray-600 text-center mt-2">{description}</p>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.map((project, index) => (
            <div
              key={project.post_id}
              className={`bg-white shadow-lg rounded-lg p-4 relative transform transition-transform hover:scale-105 hover:shadow-xl 
                ${
                  index % 2 === 0
                    ? "translate-x-2 -rotate-2"
                    : "-translate-x-2 rotate-2"
                }`}
              style={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <img
                src={project.post_img}
                alt={project.post_title}
                className="rounded-md w-full h-48 object-cover"
              />
              <h3 className="text-lg font-semibold mt-4">{project.post_title}</h3>
              <p className="text-gray-700 mt-2 text-sm">{project.post_desc}</p>
              <div className="mt-4 flex justify-between items-center">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Learn More
                </a>
                {removeProject && (
                  <button
                    onClick={() => removeProject(project.post_id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
