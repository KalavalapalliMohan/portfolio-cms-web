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
    resume: "",
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

        resume: settings.resume || "",

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
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      // Laravel method spoofing
      data.append("_method", "PUT");

      await settingService.updateSettings(
        settings.id,

        data,
      );

      Swal.fire({
        icon: "success",

        title: "Updated",

        text: "Settings updated successfully",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log("FULL ERROR:", error);

      console.log("VALIDATION:", error.response?.data);

      Swal.fire({
        icon: "error",

        title: "Error",

        text: JSON.stringify(error.response?.data, null, 2),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary rounded p-4">
        <h5 className="text-white mb-4">Website Settings</h5>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>

              <input
                className="form-control"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Profession</label>

              <input
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>

              <input
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Phone</label>

              <input
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Location</label>

              <input
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Resume</label>

              <input
                className="form-control"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <label>About</label>

              <textarea
                className="form-control"
                rows="5"
                name="about"
                value={formData.about}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Profile Image</label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {preview && (
              <div className="col-md-6 mb-3">
                <img
                  src={preview}
                  width="120"
                  className="img-thumbnail"
                  alt="Profile Preview"
                />
              </div>
            )}
          </div>

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsModal;
