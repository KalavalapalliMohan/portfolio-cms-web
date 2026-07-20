import { useEffect, useState } from "react";
import experienceService from "../../../services/experienceService";
import ExperienceModal from "./ExperienceModal";
import Swal from "sweetalert2";

function ExperienceList() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editExperience, setEditExperience] = useState(null);

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
      await experienceService.deleteExperience(id);

      setExperiences((prev) =>
        prev.filter((experience) => experience.id !== id)
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
    }
  };

  if (loading) {
    return (
      <div className="container-fluid pt-4 px-4">
        <h4 className="text-white">Loading Experiences...</h4>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-secondary rounded h-100 p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-white mb-0">
                  Experiences
                </h5>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditExperience(null);
                    setShowModal(true);
                  }}
                >
                  <i className="fa fa-plus me-2"></i>
                  Add Experience
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company</th>
                      <th>Designation</th>
                      <th>Location</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Current</th>
                      <th width="180">Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {experiences.length > 0 ? (

                      experiences.map((experience, index) => (

                        <tr key={experience.id}>

                          <td>{index + 1}</td>

                          <td>{experience.company_name}</td>

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
                              <span className="badge bg-success">
                                Working
                              </span>
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
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDelete(experience.id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>
                        <td
                          colSpan="8"
                          className="text-center"
                        >
                          No Experiences Found
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