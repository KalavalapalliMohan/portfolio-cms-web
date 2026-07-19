import { useEffect, useState } from "react";
import api from "../api/axios";

function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      setProjects(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container section-title">
        <h2>Portfolio</h2>

        <p>My recent projects and applications</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {projects.map((project) => (
            <div className="col-lg-4 col-md-6 portfolio-item" key={project.id}>
              <div className="card">
                <img
                  src={`http://127.0.0.1:8000/storage/${project.image}`}
                  className="img-fluid"
                  alt={project.title}
                />

                <div className="card-body">
                  <h4>{project.title}</h4>

                  <p>{project.description}</p>

                  <div>
                    {project.github_url && (
                      <a href={project.github_url} target="_blank">
                        Github
                      </a>
                    )}
                    &nbsp;
                    {project.live_url && (
                      <a href={project.live_url} target="_blank">
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
