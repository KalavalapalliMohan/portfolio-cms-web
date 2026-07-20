import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import certificateService from "../../../services/certificateService";

function CertificateModal({ show, onClose, onSuccess, certificate }) {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    issue_date: "",
    certificate_url: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (certificate) {
      setFormData({
        title: certificate.title || "",

        organization: certificate.organization || "",

        issue_date: certificate.issue_date || "",

        certificate_url: certificate.certificate_url || "",

        image: null,
      });

      setPreview(certificate.certificate_image_url || "");
    } else {
      setFormData({
        title: "",
        organization: "",
        issue_date: "",
        certificate_url: "",
        image: null,
      });

      setPreview("");
    }
  }, [certificate, show]);

  if (!show) return null;

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

      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);

      data.append("organization", formData.organization);

      data.append("issue_date", formData.issue_date);

      data.append("certificate_url", formData.certificate_url || "");

      if (formData.image) {
        data.append("certificate_image", formData.image);
      }

      console.log("FORM DATA");

      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (certificate) {
        await certificateService.updateCertificate(
          certificate.id,

          data,
        );

        Swal.fire({
          icon: "success",

          title: "Updated",

          text: "Certificate updated successfully",
        });
      } else {
        await certificateService.createCertificate(data);

        Swal.fire({
          icon: "success",

          title: "Created",

          text: "Certificate created successfully",
        });
      }

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.log("FULL ERROR:", error);

      console.log("VALIDATION:", error.response?.data);

      Swal.fire({
        icon: "error",

        title: "Error",

        html: `

                <pre style="text-align:left">
                ${JSON.stringify(error.response?.data, null, 2)}
                </pre>

                `,
      });
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
              {certificate ? "Edit Certificate" : "Add Certificate"}
            </h5>

            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Certificate Name</label>

                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Organization</label>

                  <input
                    type="text"
                    name="organization"
                    className="form-control"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Issue Date</label>

                  <input
                    type="date"
                    name="issue_date"
                    className="form-control"
                    value={formData.issue_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Certificate URL</label>

                  <input
                    type="url"
                    name="certificate_url"
                    className="form-control"
                    value={formData.certificate_url}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Certificate Image</label>

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
                      alt="preview"
                    />
                  </div>
                )}
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
                  : certificate
                    ? "Update Certificate"
                    : "Save Certificate"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CertificateModal;
