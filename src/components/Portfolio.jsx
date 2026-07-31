import { useEffect, useState } from "react";
import api from "../api/axios";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Project API Error:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const getDescriptionList = (description = "") => {
    return description
      .split("\n")
      .map((item) => item.replace("•", "").trim())
      .filter(Boolean);
  };

  const technologyBadges = (technologies) => {
    if (!technologies) return null;

    return technologies.split("|").map((tech, index) => (
      <span key={index} className="portfolio-tech-badge">
        {tech.trim()}
      </span>
    ));
  };

  return (
    <section id="portfolio" className="portfolio section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>

        <p>
          A collection of projects showcasing my experience in Laravel, React,
          REST APIs, PostgreSQL and enterprise web applications.
        </p>
      </div>

      <div className="container">
        {loading ? (
          <div className="text-center py-5">
            <div id="preloader"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center">
            <p>No projects available.</p>
          </div>
        ) : (
          <div className="row gy-4">
            {projects.map((project, index) => {
              const descriptions = getDescriptionList(project.description);

              return (
                <div
                  className="col-lg-6 col-xl-4"
                  key={project.id}
                  data-aos="zoom-in-up"
                  data-aos-delay={index * 100}
                >
                  <div className="portfolio-card">
                    <div className="portfolio-image">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="portfolio-placeholder">
                          <i className="bi bi-code-slash"></i>
                        </div>
                      )}

                      {project.is_featured === 1 && (
                        <span className="featured-ribbon">Featured</span>
                      )}
                    </div>

                    <div className="portfolio-body">
                      <h4>{project.title}</h4>

                      <div className="mb-3">
                        {technologyBadges(project.technologies)}
                      </div>

                      <ul className="project-description">
                        {descriptions.slice(0, 3).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>

                      {descriptions.length > 3 && (
                        <button
                          className="portfolio-readmore"
                          data-bs-toggle="modal"
                          data-bs-target="#projectModal"
                          onClick={() => setSelectedProject(project)}
                        >
                          Read More →
                        </button>
                      )}

                      <div className="portfolio-buttons">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-dark btn-sm"
                          >
                            <i className="bi bi-github me-2"></i>
                            GitHub
                          </a>
                        )}

                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                          >
                            <i className="bi bi-box-arrow-up-right me-2"></i>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}

      <div
        className="modal fade"
        id="projectModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{selectedProject?.title}</h4>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-4">
                {technologyBadges(selectedProject?.technologies)}
              </div>

              <ul>
                {selectedProject &&
                  getDescriptionList(selectedProject.description).map(
                    (item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ),
                  )}
              </ul>
            </div>

            <div className="modal-footer">
              {selectedProject?.github_url && (
                <a
                  href={selectedProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                >
                  GitHub
                </a>
              )}

              {selectedProject?.live_url && (
                <a
                  href={selectedProject.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
