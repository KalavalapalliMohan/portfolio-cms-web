import { useEffect, useState } from "react";
import skillService from "../../../services/skillService";
import SkillModal from "./SkillModal";
import Swal from "sweetalert2";

function SkillList() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editSkill, setEditSkill] = useState(null);

  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchSkills();
  }, []);

const fetchSkills = async (page = 1) => {
  try {
    setLoading(true);

    const response = await skillService.getSkills(page);

    console.log(response);

    setSkills(response.data || []);
    setPagination({
      links: response.links,
      meta: response.meta,
    });
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (skill) => {
    setEditSkill(skill);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await skillService.deleteSkill(id);

      setSkills((prev) => prev.filter((skill) => skill.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Skill deleted successfully.",
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
        <div className="skill-loading">
          <div className="spinner-border text-primary" role="status"></div>

          <h5 className="mt-3 mb-1">Loading Skills...</h5>

          <p className="text-muted mb-0">
            Please wait while we fetch your skills.
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
                <i className="fa fa-code me-2 text-primary-icon"></i>
                Skills
              </h4>

              <p>
                Manage your technical skills, categories and proficiency levels.
              </p>
            </div>

            <button
              className="btn btn-primary global-add-button"
              onClick={() => {
                setEditSkill(null);
                setShowModal(true);
              }}
            >
              <i className="fa fa-plus me-2"></i>
              Add Skill
            </button>
          </div>

          <div className="table-responsive">
            <table className="table admin-table align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  
                  <th>Sort Order</th>

                  <th>Skill</th>

                  <th>Percentage</th>

                  <th>Category</th>


                  <th>Status</th>

                  <th width="180">Actions</th>
                </tr>
              </thead>

              <tbody>
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <tr key={skill.id}>
                      <td>{index + 1}</td>
                      <td>{skill.sort_order}</td>

                      <td>
                        <div className="fw-semibold">{skill.name}</div>
                      </td>

                      <td>
                        <div className="skill-progress-wrapper">
                          <div className="progress skill-progress">
                            <div
                              className="progress-bar bg-primary"
                              role="progressbar"
                              style={{
                                width: `${skill.percentage}%`,
                              }}
                            >
                            {skill.percentage}%
                            </div>
                          </div>


                        </div>
                      </td>

                      <td>
                        <span className="text-capitalize">
                          {skill.category}
                        </span>
                      </td>

                      <td>
                        {skill.status ? (
                          <span className="badge bg-success">
                            <i className="fa fa-check me-1"></i>
                            Active
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            <i className="fa fa-times me-1"></i>
                            Inactive
                          </span>
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(skill)}
                        >
                          <i className="fa fa-edit me-1"></i>
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(skill.id)}
                        >
                          <i className="fa fa-trash me-1"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <i className="fa fa-code fa-3x text-muted mb-3 d-block"></i>

                      <h5 className="mb-2">No Skills Found</h5>

                      <p className="text-muted mb-0">
                        Add your first technical skill to display here.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {pagination.meta && (
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                  className="btn btn-outline global-add-button"
                  disabled={pagination.meta.current_page === 1}
                  onClick={() => fetchSkills(pagination.meta.current_page - 1)}
                >
                  <i className="fa fa-chevron-left me-2"></i>
                  Previous
                </button>

                <span>
                  Page {pagination.meta.current_page} of {pagination.meta.last_page}
                </span>

                <button
                  className="btn btn-outline global-add-button"
                  disabled={
                    pagination.meta.current_page === pagination.meta.last_page
                  }
                  onClick={() => fetchSkills(pagination.meta.current_page + 1)}
                >
                  Next
                  <i className="fa fa-chevron-right ms-2"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SkillModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditSkill(null);
        }}
        onSuccess={fetchSkills}
        skill={editSkill}
      />
    </>
  );
}

export default SkillList;
