import { useState, useEffect } from "react";
import projectService from "../../../services/projectService";
import Swal from "sweetalert2";

function ProjectModal({ show, onClose, onSuccess, project }) {
  const initialState = {
    title: "",
    slug: "",
    description: "",
    technologies: "",
    github_url: "",
    live_url: "",
    image: null,
    is_featured: true,
    status: true,
  };

  const [formData, setFormData] = useState(initialState);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        slug: project.slug || "",
        description: project.description || "",
        technologies: project.technologies || "",
        github_url: project.github_url || "",
        live_url: project.live_url || "",

        image: null,

        is_featured: Boolean(project.is_featured),

        status: Boolean(project.status),
      });

      setPreview(project.image_url || "");
    } else {
      setFormData(initialState);

      setPreview("");
    }
  }, [project, show]);

  // Disable background scroll
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  // cleanup preview memory
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (!show) return null;

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title") {
      setFormData((prev) => ({
        ...prev,

        title: value,

        slug: generateSlug(value),
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,

      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageName = project?.image || "";

      if (formData.image) {
        const uploadData = new FormData();

        uploadData.append("image", formData.image);

        const uploadResponse = await projectService.uploadImage(uploadData);

        imageName = uploadResponse.data.image;
      }

      const payload = {
        title: formData.title,

        slug: formData.slug,

        description: formData.description,

        technologies: formData.technologies,

        github_url: formData.github_url,

        live_url: formData.live_url,

        image: imageName,

        is_featured: formData.is_featured,

        status: formData.status,
      };

      if (project) {
        await projectService.updateProject(project.id, payload);

        Swal.fire({
          icon: "success",

          title: "Updated!",

          text: "Project updated successfully",

          timer: 1500,

          showConfirmButton: false,
        });
      } else {
        await projectService.createProject(payload);

        Swal.fire({
          icon: "success",

          title: "Created!",

          text: "Project created successfully",

          timer: 1500,

          showConfirmButton: false,
        });
      }

      onSuccess && onSuccess();

      onClose();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Error",

        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-modal-overlay">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content admin-modal">
          {/* HEADER */}

          <div className="modal-header">
            <div>
              <h5 className="modal-title">
                <i className="fa fa-folder-open me-2"></i>

                {project ? "Edit Project" : "Add New Project"}
              </h5>

              <small className="text-muted">
                Manage portfolio project details
              </small>
            </div>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* BODY */}

            <div className="modal-body project-modal-body">
              <div className="row g-4">
                {/* LEFT FORM */}

                <div className="col-lg-8">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Project Title</label>

                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Slug</label>

                      <input
                        type="text"
                        name="slug"
                        className="form-control"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Description</label>

                      <textarea
                        rows="4"
                        name="description"
                        className="form-control"
                        placeholder="Enter project description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Technologies</label>

                      <input
                        type="text"
                        name="technologies"
                        className="form-control"
                        placeholder="Laravel, React, MySQL"
                        value={formData.technologies}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Github URL</label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fab fa-github"></i>
                        </span>

                        <input
                          type="url"
                          name="github_url"
                          className="form-control"
                          value={formData.github_url}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Live URL</label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa fa-link"></i>
                        </span>

                        <input
                          type="url"
                          name="live_url"
                          className="form-control"
                          value={formData.live_url}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* IMAGE SECTION */}

                <div className="col-lg-4">
                  <div className="project-image-box">
                    <label className="form-label">Project Image</label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImage}
                    />

                    {preview && (
                      <div className="project-preview mt-3">
                        <img src={preview} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SETTINGS */}

              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="project-toggle-box">
                    <div>
                      <h6>Featured Project</h6>

                      <small>Show in portfolio featured section</small>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="project-toggle-box">
                    <div>
                      <h6>Project Status</h6>

                      <small>Enable or disable visibility</small>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="modal-footer project-modal-footer">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={onClose}
              >
                <i className="fa fa-times me-2"></i>
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary global-add-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>

                    {project ? "Update Project" : "Save Project"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
