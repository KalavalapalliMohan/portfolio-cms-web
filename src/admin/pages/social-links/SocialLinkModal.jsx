import { useEffect, useState } from "react";
import socialLinkService from "../../../services/socialLinkService";

function SocialLinkModal({
  show,
  onClose,
  onSuccess,
 socialLink = null,
}) {
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "",
    sort_order: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (socialLink) {
      setFormData({
        platform: socialLink.platform || "",
        url: socialLink.url || "",
        icon: socialLink.icon || "",
        sort_order: socialLink.sort_order || 0,
      });
    } else {
      setFormData({
        platform: "",
        url: "",
        icon: "",
        sort_order: 0,
      });
    }
  }, [socialLink, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (socialLink) {
        await socialLinkService.updateSocialLink(
          socialLink.id,
          formData
        );

        alert("Social Link Updated Successfully");
      } else {
        await socialLinkService.createSocialLink(formData);

        alert("Social Link Created Successfully");
      }

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.error(error);
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
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-secondary text-white">

          <div className="modal-header">
            <h5 className="modal-title">
              {socialLink ? "Edit Social Link" : "Add Social Link"}
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
                  Platform
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  placeholder="LinkedIn"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  URL
                </label>

                <input
                  type="url"
                  className="form-control"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Bootstrap Icon
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="bi bi-linkedin"
                />

                <small className="text-light">
                  Example: bi bi-linkedin, bi bi-github,
                  bi bi-twitter-x, bi bi-instagram
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Sort Order
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleChange}
                />
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
                  : socialLink
                  ? "Update Social Link"
                  : "Save Social Link"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default SocialLinkModal;