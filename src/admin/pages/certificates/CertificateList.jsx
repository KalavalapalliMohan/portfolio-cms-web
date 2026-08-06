import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import certificateService from "../../../services/certificateService";
import CertificateModal from "./CertificateModal";

function CertificateList() {
  const [showModal, setShowModal] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await certificateService.getCertificates();
      setCertificates(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Certificate?",
      text: "You won't be able to recover this certificate.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);

      await certificateService.deleteCertificate(id);

      setCertificates((prev) =>
        prev.filter((certificate) => certificate.id !== id),
      );

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Certificate deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unable to delete certificate.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid pt-4 px-4">
        <div className="certificate-loading">
          <div className="spinner-border text-primary" role="status"></div>

          <h5 className="mt-3 mb-1">Loading Certificates...</h5>

          <p className="text-muted mb-0">
            Please wait while we fetch your certificates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h4 className="mb-2 Admin-gradient">
                <i className="fa fa-certificate me-2 text-primary-icon"></i>
                Certificates
              </h4>

              <p>
                Manage your professional certifications.
              </p>
            </div>

            <button
              className="btn btn-primary global-add-button"
              onClick={() => {
                setSelectedCertificate(null);
                setShowModal(true);
              }}
            >
              <i className="fa fa-plus me-2"></i>
              Add Certificate
            </button>
          </div>

          <div className="table-responsive">
            <table className="table admin-table align-middle">
              <thead>
                <tr>
                  <th>#</th>

                  <th>Image</th>

                  <th>Title</th>

                  <th>Organization</th>

                  <th>Issue Date</th>

                  <th>Certificate</th>

                  <th width="170">Actions</th>
                </tr>
              </thead>

              <tbody>
                {certificates.length > 0 ? (
                  certificates.map((certificate, index) => (
                    <tr key={certificate.id}>
                      <td>{index + 1}</td>

                      <td>
                        {certificate.certificate_image_url ? (
                          <img
                            src={certificate.certificate_image_url}
                            alt={certificate.title}
                            className="certificate-image"
                          />
                        ) : (
                          <div className="certificate-placeholder">
                            <i className="fa fa-image"></i>
                          </div>
                        )}
                      </td>

                      <td>
                        <div className="fw-semibold">{certificate.title}</div>
                      </td>

                      <td>{certificate.organization}</td>

                      <td>{certificate.issue_date}</td>

                      <td>
                        {certificate.certificate_url ? (
                          <a
                            href={certificate.certificate_url}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-info"
                          >
                            <i className="fa fa-external-link-alt me-1"></i>
                            View
                          </a>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setSelectedCertificate(certificate);
                            setShowModal(true);
                          }}
                        >
                          <i className="fa fa-edit me-1"></i>
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          disabled={deletingId === certificate.id}
                          onClick={() => handleDelete(certificate.id)}
                        >
                          {deletingId === certificate.id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1"></span>
                              Deleting
                            </>
                          ) : (
                            <>
                              <i className="fa fa-trash me-1"></i>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <i className="fa fa-certificate fa-3x text-muted mb-3 d-block"></i>

                      <h5 className="mb-2">No Certificates Found</h5>

                      <p className="text-muted mb-0">
                        Click "Add Certificate" to create your first
                        certificate.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CertificateModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCertificate(null);
        }}
        onSuccess={fetchCertificates}
        certificate={selectedCertificate}
      />
    </>
  );
}

export default CertificateList;
