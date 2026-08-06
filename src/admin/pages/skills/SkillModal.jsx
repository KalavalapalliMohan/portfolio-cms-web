import { useEffect, useState } from "react";
import skillService from "../../../services/skillService";
import Swal from "sweetalert2";

function SkillModal({ show, onClose, onSuccess, skill = null }) {
  const [formData, setFormData] = useState({
    name: "",
    percentage: "",
    category: "",
    sort_order: 0,
    status: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        percentage: skill.percentage || "",
        category: skill.category || "",
        sort_order: skill.sort_order || 0,
        status: skill.status,
      });
    } else {
      setFormData({
        name: "",
        percentage: "",
        category: "",
        sort_order: 0,
        status: true,
      });
    }
  }, [skill, show]);

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

      if (skill) {
          await skillService.updateSkill(skill.id, {
            ...formData,
            name: formData.name.trim(),
          });

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Skill Updated Successfully",
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
          await skillService.createSkill({
            ...formData,
            name: formData.name.trim(),
          });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Skill Created Successfully",
          timer: 1800,
          showConfirmButton: false,
        });
      }

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Something went wrong.",
      });

      // alert(JSON.stringify(error.response?.data, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // percentage here
  const percentage = Math.min(
    100,
    Math.max(0, Number(formData.percentage) || 0)
  );


  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,.6)",
        animation: "fadeIn .25s ease",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content admin-modal text-white">
          <div className="modal-header admin-modal-header">
            <h5 className="modal-title">
              {/* <i className="fa fa-code me-2 text-primary"></i> */}

              {skill ? "Edit Skill" : "Add Skill"}
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body admin-modal-body">
              <div className="row g-4">
                {/* Skill Name */}

                <div className="col-md-6">
                  <label className="form-label">Skill Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Laravel"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Percentage */}

                <div className="col-md-6">
                  <label className="form-label">Percentage</label>

                  <input
                    type="number"
                    name="percentage"
                    className="form-control"
                    placeholder="90"
                    min="0"
                    max="100"
                    value={formData.percentage}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}

                <div className="col-md-6">
                  <label className="form-label">Category</label>

                  <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                  >
                      <option value="">Select Category</option>
                      <option value="Backend">Backend</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Database">Database</option>
                      <option value="Tools">Tools</option>
                      <option value="Cloud">Cloud</option>
                      <option value="Others">Others</option>
                  </select>
                </div>

                {/* Sort Order */}

                <div className="col-md-6">
                  <label className="form-label">Sort Order</label>

                  <input
                    type="number"
                    name="sort_order"
                    className="form-control"
                    min="0"
                    value={formData.sort_order}
                    onChange={handleChange}
                  />
                </div>

                {/* Status */}

                <div className="col-12">
                  <div className="skill-status-box">
                    <div>
                      <h6 className="mb-1">Skill Status</h6>

                      <small className="text-muted">
                        Enable or disable this skill on your portfolio.
                      </small>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleChange}
                      />

                      <label className="form-check-label ms-2">
                        {formData.status ? "Active" : "Inactive"}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Percentage Preview */}

                <div className="col-12">
                  <label className="form-label">Skill Level Preview</label>

                  <div className="skill-modal-progress">
                    <div
                      className="skill-modal-progress-bar"
                      style={{
                        width: `${percentage}%`,
                      }}
                    >
                      {percentage}%
                    </div>
                  </div>

                  <small className="text-muted mt-2 d-block">
                    Current Level: {percentage}%
                  </small>
                </div>
              </div>
            </div>

            <div className="modal-footer admin-modal-footer">
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

                    {skill ? "Update Skill" : "Save Skill"}
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

export default SkillModal;
