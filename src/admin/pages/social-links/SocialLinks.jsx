import { useEffect, useState } from "react";
import socialLinkService from "../../../services/socialLinkService";
import SocialLinkModal from "./SocialLinkModal";

function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedSocialLink, setSelectedSocialLink] = useState(null);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);

      const response = await socialLinkService.getSocialLinks();

      // console.log(response);

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
    if (!window.confirm("Delete this social link?")) {
      return;
    }

    try {
      await socialLinkService.deleteSocialLink(id);

      alert("Deleted Successfully");

      fetchSocialLinks();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">

      <div className="bg-secondary rounded p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4 className="text-white">
            Social Links
          </h4>

          <button
            className="btn btn-primary"
            onClick={handleAdd}
          >
            <i className="fa fa-plus me-2"></i>
            Add Social Link
          </button>

        </div>

        <div className="table-responsive">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>ID</th>
                <th>Platform</th>
                <th>Icon</th>
                <th>URL</th>
                <th>Sort Order</th>
                <th width="170">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : socialLinks.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No Social Links Found
                  </td>
                </tr>
              ) : (
                socialLinks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>

                    <td>{item.platform}</td>

                    <td>
                      <i className={item.icon}></i>
                      <span className="ms-2">
                        {item.icon}
                      </span>
                    </td>

                    <td>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-info"
                      >
                        {item.url}
                      </a>
                    </td>

                    <td>{item.sort_order}</td>

                    <td>

                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      <SocialLinkModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchSocialLinks}
        socialLink={selectedSocialLink}
      />

    </div>
  );
}

export default SocialLinks;