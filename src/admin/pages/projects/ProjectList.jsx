import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import projectService from "../../../services/projectService";
import ProjectModal from "./ProjectModal";

function ProjectList() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects();

      setProjects(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Project?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#d33",

      cancelButtonColor: "#6c757d",

      confirmButtonText: "Delete Project",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);

      await projectService.deleteProject(id);

      setProjects((prev) => prev.filter((project) => project.id !== id));

      Swal.fire({
        icon: "success",

        title: "Deleted",

        text: "Project removed successfully",

        timer: 1500,

        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Delete Failed",

        text: "Unable to delete project",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid pt-4 px-4">
        <div className="project-loading">
          <div className="spinner-border text-primary" role="status"></div>

          <h5 className="mt-3 mb-1">Loading Projects...</h5>

          <p className="text-muted mb-0">
            Please wait while we fetch your projects.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h5 className="Admin-gradient">
                    <i className="fa fa-briefcase me-2 text-primary-icon"></i>
                    Projects
                  </h5>

                  <p>Manage your portfolio projects</p>
                </div>

                <button
                  className="btn btn-primary global-add-button"
                  onClick={() => {
                    setSelectedProject(null);

                    setShowModal(true);
                  }}
                >
                  <i className="fa fa-plus me-2"></i>
                  Add Project
                </button>
              </div>

              <div className="table-responsive">
                <table className="table admin-table align-middle">
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Image</th>

                      <th>Project</th>

                      <th>Technology</th>

                      <th>Status</th>

                      <th>Featured</th>

                      <th width="180">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.length > 0 ? (
                      projects.map((project, index) => (
                        <tr key={project.id}>
                          <td>{index + 1}</td>

                          <td>
                            {project.image_url ? (
                              <img
                                src={project.image_url}
                                className="project-thumb"
                                alt={project.title}
                              />
                            ) : (
                              <div className="project-no-image">
                                <i className="fa fa-image"></i>
                              </div>
                            )}
                          </td>

                          <td>
                            <div className="project-title">
                              <h6>{project.title}</h6>

                              {project.slug && <small>{project.slug}</small>}
                            </div>
                          </td>

                          <td>
                            <span className="technology-text">
                              {project.technologies}
                            </span>
                          </td>

                          <td>
                            {project.status ? (
                              <span className="badge-status active">
                                <i className="fa fa-check-circle me-1"></i>
                                Active
                              </span>
                            ) : (
                              <span className="badge-status inactive">
                                <i className="fa fa-times-circle me-1"></i>
                                Inactive
                              </span>
                            )}
                          </td>

                          <td>
                            {project.is_featured ? (
                              <span className="badge-status featured">
                                <i className="fa fa-star me-1"></i>
                                Featured
                              </span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              title="Edit Project"
                              onClick={() => {
                                setSelectedProject(project);

                                setShowModal(true);
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </button>

                            <button
                              className="btn btn-sm btn-danger"
                              title="Delete Project"
                              disabled={deletingId === project.id}
                              onClick={() => handleDelete(project.id)}
                            >
                              {deletingId === project.id ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <i className="fa fa-trash"></i>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-5">
                          <div className="empty-state">
                            <i className="fa fa-folder-open"></i>

                            <h6>No Projects Found</h6>

                            <p>Start by adding your first portfolio project.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectModal
        show={showModal}
        onClose={() => {
          setShowModal(false);

          setSelectedProject(null);
        }}
        onSuccess={fetchProjects}
        project={selectedProject}
      />
    </>
  );
}

export default ProjectList;
