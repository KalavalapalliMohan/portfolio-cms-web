import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import educationService from "../../../services/educationService";
import EducationModal from "./EducationModal";

function EducationList() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editEducation, setEditEducation] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await educationService.getEducations();
      setEducations(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (education) => {
    setEditEducation(education);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Education?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);

      await educationService.deleteEducation(id);

      setEducations((prev) => prev.filter((education) => education.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Education deleted successfully.",
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
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid pt-4 px-4">
        <div className="education-loading">
          <div className="spinner-border text-primary" role="status"></div>

          <h5 className="mt-3 mb-1">Loading Educations...</h5>

          <p className="text-muted mb-0">
            Please wait while we fetch your education records.
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
                <i className="fa fa-graduation-cap me-2 text-primary-icon"></i>
                Education
                </h4>

              <p>
                Manage your academic qualifications.
              </p>
            </div>

            <button
              className="btn btn-primary global-add-button"
              onClick={() => {
                setEditEducation(null);
                setShowModal(true);
              }}
            >
              <i className="fa fa-plus me-2"></i>
              Add Education
            </button>
          </div>

          <div className="table-responsive">
            <table className="table admin-table align-middle">
              <thead>
                <tr>
                  <th>#</th>

                  <th>Institution</th>

                  <th>Degree</th>

                  <th>Field</th>

                  <th>Grade</th>

                  <th>Duration</th>

                  <th width="180">Actions</th>
                </tr>
              </thead>

              <tbody>
                {educations.length > 0 ? (
                  educations.map((education, index) => (
                    <tr key={education.id}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="fw-semibold">
                          {education.institution}
                        </div>
                      </td>

                      <td>{education.degree}</td>

                      <td>{education.field_of_study}</td>

                      <td>{education.grade || "-"}</td>

                      <td>
                        <span className="badge bg-info">
                          {education.start_year}

                          {" - "}

                          {education.end_year}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(education)}
                        >
                          <i className="fa fa-edit me-1"></i>
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          disabled={deletingId === education.id}
                          onClick={() => handleDelete(education.id)}
                        >
                          {deletingId === education.id ? (
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
                      <i className="fa fa-graduation-cap fa-3x text-muted mb-3 d-block"></i>

                      <h5 className="mb-2">No Education Records Found</h5>

                      <p className="text-muted mb-0">
                        Click "Add Education" to create your first education
                        record.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EducationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchEducations}
        education={editEducation}
      />
    </>
  );
}

export default EducationList;
