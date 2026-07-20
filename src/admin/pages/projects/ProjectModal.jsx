import { useState, useEffect } from "react";
import projectService from "../../../services/projectService";
import Swal from "sweetalert2";

function ProjectModal({ show, onClose, onSuccess, project }) {
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        technologies: "",
        github_url: "",
        live_url: "",
        image: null,
        is_featured: true,
        status: true,
    });

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
                is_featured: project.is_featured,
                status: project.status,
            });

            setPreview(project.image_url || "");

        } else {

            setFormData({
                title: "",
                slug: "",
                description: "",
                technologies: "",
                github_url: "",
                live_url: "",
                image: null,
                is_featured: true,
                status: true,
            });

            setPreview("");

        }

    }, [project, show]);

    if (!show) return null;

    // get data in fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };
    // get image preview
    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
        ...prev,
        image: file,
        }));

        setPreview(URL.createObjectURL(file));
    };
    // create project
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        let imageName = "";

        // Upload image first
        if (formData.image) {
        const uploadData = new FormData();

        uploadData.append("image", formData.image);

        const uploadResponse = await projectService.uploadImage(uploadData);

        console.log("Upload Response:", uploadResponse);

        // IMPORTANT
        imageName = uploadResponse.data.image;

        console.log("Image Name:", imageName);
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

        console.log("Payload:", payload);

    if (project) {

        await projectService.updateProject(
            project.id,
            payload
        );

        alert("Project Updated Successfully");

    } else {

        await projectService.createProject(payload);

        alert("Project Created Successfully");

    }

        if (onSuccess) {
        onSuccess();
        }

        onClose();

    } catch (error) {

        console.log("Full Error:", error.response);

        console.log("Validation:", error.response?.data);

        alert(JSON.stringify(error.response?.data, null, 2));

    } finally {

        setLoading(false);

    }
    };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,.6)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content bg-secondary text-white">

          <div className="modal-header">
            <h5 className="modal-title">
              {project ? "Edit Project" : "Add Project"}
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>

            <div
              className="modal-body"
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
                <div className="row">
                    <div className="col-6 mb-3">
                        <label className="form-label">
                        Project Title
                        </label>

                        <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label className="form-label">
                        Slug
                        </label>

                        <input
                        type="text"
                        name="slug"
                        className="form-control"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label className="form-label">
                        Description
                        </label>

                        <textarea
                        rows="2"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="col-6 mb-3">
                        <label className="form-label">
                        Technologies
                        </label>

                        <input
                        type="text"
                        name="technologies"
                        className="form-control"
                        value={formData.technologies}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label className="form-label">
                        Github URL
                        </label>

                        <input
                        type="url"
                        name="github_url"
                        className="form-control"
                        value={formData.github_url}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label className="form-label">
                        Live URL
                        </label>

                        <input
                        type="url"
                        name="live_url"
                        className="form-control"
                        value={formData.live_url}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="col-6 mb-3">
                        <label className="form-label">
                        Project Image
                        </label>

                        <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImage}
                        />
                    </div>
                    {preview && (
                        <div className="col-6 mb-3">
                            <img
                                src={preview}
                                alt="Preview"
                                width="120"
                                className="img-thumbnail"
                            />
                        </div>
                    )}

                </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Featured Project
                </label>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Active
                </label>
              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-danger"
                onClick={onClose}
              >
                Cancel
              </button>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Project"}
            </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;