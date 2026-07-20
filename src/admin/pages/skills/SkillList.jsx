import { useEffect, useState } from "react";
import skillService from "../../../services/skillService";
import SkillModal from "./SkillModal";
import Swal from "sweetalert2";

function SkillList() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editSkill, setEditSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillService.getSkills();

      setSkills(response.data || []);
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
        confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) {
        return;
    }

    try {

        await skillService.deleteSkill(id);

        setSkills((prev) =>
            prev.filter((skill) => skill.id !== id)
        );

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
        <h4 className="text-white">Loading Skills...</h4>
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
                  Skills
                </h5>

                <button
                  className="btn btn-primary"
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
                <table className="table table-dark table-hover align-middle">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Skill</th>
                      <th>Percentage</th>
                      <th>Category</th>
                      <th>Sort Order</th>
                      <th>Status</th>
                      <th width="180">Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {skills.length > 0 ? (

                      skills.map((skill, index) => (

                        <tr key={skill.id}>

                          <td>{index + 1}</td>

                          <td>{skill.name}</td>

                          <td>
                            <span className="badge bg-info">
                              {skill.percentage}%
                            </span>
                          </td>

                          <td>{skill.category}</td>

                          <td>{skill.sort_order}</td>

                          <td>
                            {skill.status ? (
                              <span className="badge bg-success">
                                Active
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                Inactive
                              </span>
                            )}
                          </td>

                          <td>

                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(skill)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(skill.id)}
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>
                        <td
                          colSpan="7"
                          className="text-center"
                        >
                          No Skills Found
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

      <SkillModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchSkills}
        skill={editSkill}
      />
    </>
  );
}

export default SkillList;