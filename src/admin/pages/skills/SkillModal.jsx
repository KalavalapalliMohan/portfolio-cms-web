import { useEffect, useState } from "react";
import skillService from "../../../services/skillService";

function SkillModal({
  show,
  onClose,
  onSuccess,
  skill = null,
}) {
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
        await skillService.updateSkill(skill.id, formData);

        alert("Skill Updated Successfully");
      } else {
        await skillService.createSkill(formData);

        alert("Skill Created Successfully");
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
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content bg-secondary text-white">

          <div className="modal-header">
            <h5 className="modal-title">
              {skill ? "Edit Skill" : "Add Skill"}
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">
                  Skill Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Percentage
                </label>

                <input
                  type="number"
                  name="percentage"
                  className="form-control"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Backend / Frontend"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Sort Order
                </label>

                <input
                  type="number"
                  name="sort_order"
                  className="form-control"
                  value={formData.sort_order}
                  onChange={handleChange}
                />
              </div>

              <div className="form-check">
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
                {loading
                  ? "Saving..."
                  : skill
                  ? "Update Skill"
                  : "Save Skill"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default SkillModal;