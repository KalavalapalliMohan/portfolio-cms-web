import { useEffect, useState } from "react";

import settingService from "../../../services/settingService";

import Swal from "sweetalert2";

function SettingsModal({ settings, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    resume: null,
    profile_image: null,
  });

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        full_name: settings.full_name || "",

        title: settings.title || "",

        email: settings.email || "",

        phone: settings.phone || "",

        location: settings.location || "",

        about: settings.about || "",

        resume: null,

        profile_image: null,
      });

      setPreview(settings.profile_image || "");
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,

      profile_image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });

      if (settings && settings.id) {
        // Update
        data.append("_method", "PUT");
        await settingService.updateSettings(settings.id, data);
      } else {
        // First Time Create
        await settingService.createSettings(data);
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: settings
          ? "Settings updated successfully."
          : "Settings created successfully.",
      });

      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="settings-card">
        <div className="settings-header">
          <div>
            <h4 className="settings-title Admin-gradient">
              <i className="fa fa-cogs me-2 text-primary text-primary-icon"></i>
              Website Settings
            </h4>

            <p className="settings-subtitle">
              Manage your portfolio profile, contact information, resume and
              branding.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Full Name */}
            <div className="col-lg-6">
              <label className="form-label fw-semibold">Full Name</label>

              <input
                type="text"
                className="form-control"
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Profession */}
            <div className="col-lg-6">
              <label className="form-label fw-semibold">
                Professional Title
              </label>

              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="PHP Laravel Full Stack Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="col-lg-6">
              <label className="form-label fw-semibold">Email Address</label>

              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="col-lg-6">
              <label className="form-label fw-semibold">Phone Number</label>

              <input
                type="text"
                className="form-control"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div className="col-lg-6">
              <label className="form-label fw-semibold">Location</label>

              <input
                type="text"
                className="form-control"
                name="location"
                placeholder="Visakhapatnam, India"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Resume */}
            <div className="col-lg-6">
              <label className="form-label fw-semibold">Resume</label>

              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    resume: e.target.files[0],
                  }))
                }
              />

              <small className="text-muted">
                Accepted formats: PDF, DOC, DOCX
              </small>
            </div>

            {/* About */}
            <div className="col-12">
              <label className="form-label fw-semibold">About</label>

              <textarea
                className="form-control"
                rows="6"
                name="about"
                placeholder="Write a short professional introduction..."
                value={formData.about}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Profile Image */}
            <div className="col-lg-6">
              <label className="form-label fw-semibold">Profile Image</label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
              />

              <small className="text-muted">
                JPG, PNG or WEBP recommended.
              </small>
            </div>

            {/* Preview */}
            <div className="col-lg-6">
              <label className="form-label fw-semibold d-block">Preview</label>

              <div className="settings-preview">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="img-fluid rounded shadow"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="settings-preview-placeholder">
                    <i className="fa fa-user-circle fa-4x text-muted mb-3"></i>

                    <p className="text-muted mb-0">No image selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="settings-actions mt-4">
            <button
              type="submit"
              className="btn btn-primary px-4 global-add-button"
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsModal;
