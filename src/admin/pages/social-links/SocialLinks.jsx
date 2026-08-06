import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import socialLinkService from "../../../services/socialLinkService";
import SocialLinkModal from "./SocialLinkModal";

function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedSocialLink, setSelectedSocialLink] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
      fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
      try {

          setLoading(true);

          const response =
              await socialLinkService.getSocialLinks();

          setSocialLinks(response.data ?? []);

      } catch (error) {

          console.error(error);

          setSocialLinks([]);

      } finally {

          setLoading(false);

      }
  };

  const handleAdd = () => {
      setSelectedSocialLink(null);
      setShowModal(true);
  };

  const handleEdit = (item) => {
      setSelectedSocialLink(item);
      setShowModal(true);
  };

  const handleDelete = async (id) => {

      const result = await Swal.fire({
          title: "Delete Social Link?",
          text: "You won't be able to recover this record.",
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

          await socialLinkService.deleteSocialLink(id);

          setSocialLinks((prev) =>
              prev.filter((item) => item.id !== id)
          );

          Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Social Link deleted successfully.",
              timer: 1500,
              showConfirmButton: false,
          });

      } catch (error) {

          console.error(error);

          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Unable to delete social link.",
          });

      } finally {

          setDeletingId(null);

      }

  };

  if (loading) {

    return (

        <div className="container-fluid pt-4 px-4">

            <div className="social-loading">

                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <h5 className="mt-3 mb-1">
                    Loading Social Links...
                </h5>

                <p className="text-muted mb-0">
                    Please wait while we fetch your social profiles.
                </p>

            </div>

        </div>

    );

  }

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="admin-card">
        <div className="admin-card-header">
            <div>
                <h4 className="mb-2 Admin-gradient">
                    <i className="fa fa-link me-2 text-primary-icon"></i>
                    Social Links
                </h4>
                <p>
                    Manage all your portfolio social media profiles.
                </p>

            </div>

            <button
                className="btn btn-primary global-add-button"
                onClick={handleAdd}
            >
                <i className="fa fa-plus me-2"></i>
                Add Social Link
            </button>

        </div>

        <div className="table-responsive">

          <table className="table align-middle table-hover social-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Platform</th>
                <th>Icon</th>
                <th>URL</th>
                <th>Sort Order</th>
                <th width="170">Actions</th>
              </tr>
            </thead>

              <tbody>

              {
                  socialLinks.length > 0 ?
                      socialLinks.map((item, index) => (
                          <tr key={item.id}>
                              <td>
                                  {index + 1}
                              </td>
                              <td>
                                  <div className="fw-semibold">
                                      {item.platform}
                                  </div>
                              </td>
                              <td>
                                  <div className="d-flex align-items-center">
                                      <span className="me-2 fs-5 text-primary list-short-order-icon">
                                          <i className={item.icon}></i>
                                      </span>
                                      <small className="text-muted">
                                          {item.icon}
                                      </small>
                                  </div>
                              </td>

                              <td>
                                  <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn btn-sm btn-outline-info"
                                  >
                                      <i className="fa fa-external-link-alt me-1"></i>
                                      Visit
                                  </a>
                              </td>

                              <td>
                                  <span className="badge bg-primary list-short-order">
                                      {item.sort_order}
                                  </span>
                              </td>

                              <td>
                                  <button
                                      className="btn btn-warning btn-sm me-2"
                                      onClick={() => handleEdit(item)}
                                  >
                                      <i className="fa fa-edit me-1"></i>
                                  </button>

                                  <button
                                      className="btn btn-danger btn-sm"
                                      disabled={deletingId === item.id}
                                      onClick={() => handleDelete(item.id)}
                                  >

                                      {
                                          deletingId === item.id ?
                                              <>
                                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                                  Deleting...
                                              </>
                                              :
                                              <>
                                                  <i className="fa fa-trash me-1"></i>
                                              </>
                                      }

                                  </button>

                              </td>

                          </tr>

                      ))

                      :

                      <tr>

                          <td
                              colSpan="6"
                              className="text-center py-5"
                          >

                              <i className="fa fa-share-alt fa-3x text-muted mb-3 d-block"></i>

                              <h5 className="mb-2">
                                  No Social Links Found
                              </h5>

                              <p className="text-muted mb-0">
                                  Click "Add Social Link" to create your first social profile.
                              </p>

                          </td>

                      </tr>

              }

              </tbody>

          </table>

        </div>

      </div>

      <SocialLinkModal
          show={showModal}
          onClose={() => {
              setShowModal(false);
              setSelectedSocialLink(null);
          }}
          onSuccess={fetchSocialLinks}
          socialLink={selectedSocialLink}
      />

    </div>
  );
}

export default SocialLinks;