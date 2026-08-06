import { useEffect, useState } from "react";
import experienceService from "../../../services/experienceService";
import ExperienceModal from "./ExperienceModal";
import Swal from "sweetalert2";

function ExperienceList() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editExperience, setEditExperience] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await experienceService.getExperiences();

      setExperiences(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience) => {
    setEditExperience(experience);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This experience will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      await experienceService.deleteExperience(id);

      setExperiences((prev) =>
        prev.filter((experience) => experience.id !== id),
      );

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Experience deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Delete failed!",
      });
    }finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid pt-4 px-4">
        <div className="experience-loading">
          <div className="spinner-border text-primary" role="status"></div>

          <h5 className="mt-3 mb-1">Loading Experiences...</h5>

          <p className="text-muted mb-0">
            Please wait while we fetch your experience records.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h4 className="mb-2 Admin-gradient">
                    <i className="fa fa-briefcase me-2 text-primary-icon"></i>
                    Experience
                  </h4>

                  <p>
                    Manage your professional work experience.
                  </p>
                </div>

                <button
                  className="btn btn-primary global-add-button"
                  onClick={() => {
                    setEditExperience(null);
                    setShowModal(true);
                  }}
                >
                  <i className="fa fa-plus me-2 "></i>
                  Add Experience
                </button>
              </div>

              <div className="table-responsive">
                <table className="table admin-table align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company</th>
                      <th>Designation</th>
                      <th>Location</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                      <th width="180">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experiences.length > 0 ? (
                      experiences.map((experience, index) => (
                        <tr key={experience.id}>
                          <td>{index + 1}</td>

                          <td>
                            <div className="fw-semibold">
                              {experience.company_name}
                            </div>
                          </td>

                          <td>{experience.designation}</td>

                          <td>{experience.location}</td>

                          <td>{experience.start_date}</td>

                          <td>
                            {experience.currently_working
                              ? "-"
                              : experience.end_date}
                          </td>

                          <td>
                            {experience.currently_working ? (
                              <span className="badge bg-success">Working</span>
                            ) : (
                              <span className="badge bg-secondary">
                                Completed
                              </span>
                            )}
                          </td>

                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(experience)}
                            >
                              <i className="fa fa-edit me-1"></i>
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              disabled={deletingId === experience.id}
                              onClick={() => handleDelete(experience.id)}
                            >
                              {deletingId === experience.id ? (
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
                        <td colSpan="8" className="text-center py-5">
                          <i className="fa fa-briefcase fa-3x text-muted mb-3 d-block"></i>

                          <h5 className="mb-2">No Experience Records Found</h5>

                          <p className="text-muted mb-0">
                            Click "Add Experience" to create your first
                            experience record.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExperienceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchExperiences}
        experience={editExperience}
      />
    </>
  );
}

export default ExperienceList;
