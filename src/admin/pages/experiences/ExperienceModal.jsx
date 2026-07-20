import { useEffect, useState } from "react";
import experienceService from "../../../services/experienceService";

function ExperienceModal({
  show,
  onClose,
  onSuccess,
  experience = null,
}) {
  const [formData, setFormData] = useState({
    company_name: "",
    designation: "",
    location: "",
    start_date: "",
    end_date: "",
    currently_working: false,
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (experience) {
      setFormData({
        company_name: experience.company_name || "",
        designation: experience.designation || "",
        location: experience.location || "",
        start_date: experience.start_date || "",
        end_date: experience.end_date || "",
        currently_working: experience.currently_working || false,
        description: experience.description || "",
      });
    } else {
      setFormData({
        company_name: "",
        designation: "",
        location: "",
        start_date: "",
        end_date: "",
        currently_working: false,
        description: "",
      });
    }
  }, [experience, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        end_date: formData.currently_working
          ? null
          : formData.end_date,
      };

      if (experience) {
        await experienceService.updateExperience(
          experience.id,
          payload
        );

        alert("Experience Updated Successfully");
      } else {
        await experienceService.createExperience(payload);

        alert("Experience Created Successfully");
      }

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.log(error);

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
              {experience
                ? "Edit Experience"
                : "Add Experience"}
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

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Company Name
                  </label>

                  <input
                    type="text"
                    name="company_name"
                    className="form-control"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Designation
                  </label>

                  <input
                    type="text"
                    name="designation"
                    className="form-control"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="start_date"
                    className="form-control"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="end_date"
                    className="form-control"
                    value={formData.end_date}
                    onChange={handleChange}
                    disabled={formData.currently_working}
                  />
                </div>

                <div className="col-12 mb-3">

                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="currently_working"
                      checked={formData.currently_working}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">
                      Currently Working Here
                    </label>
                  </div>

                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

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
                {loading
                  ? "Saving..."
                  : experience
                  ? "Update Experience"
                  : "Save Experience"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ExperienceModal;