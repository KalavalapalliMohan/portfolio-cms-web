import { useEffect, useState } from "react";

import educationService from "../../../services/educationService";


function EducationModal({ show, onClose, onSuccess, education = null, }) {

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field_of_study: "",
    grade: "",
    start_year: "",
    end_year: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (education) {
      setFormData({
        institution: education.institution || "",
        degree: education.degree || "",
        field_of_study: education.field_of_study || "",
        grade: education.grade || "",
        start_year: education.start_year || "",
        end_year: education.end_year || "",
        description: education.description || "",
      });
    } else {
      setFormData({
        institution: "",
        degree: "",
        field_of_study: "",
        grade: "",
        start_year: "",
        end_year: "",
        description: "",
      });
    }

  }, [education, show]);

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
      if (education) {
        await educationService.updateEducation(
          education.id,
          formData
        );


        alert("Education Updated Successfully");



      } else {
        await educationService.createEducation(formData);
        alert("Education Created Successfully");
      }
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.log(error);
      alert(
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );
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
              {education
                ? "Edit Education"
                : "Add Education"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            >
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            
            <div
              className="modal-body"
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
                
              <div className="mb-3">
                <label className="form-label">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  className="form-control"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  className="form-control"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Field Of Study
                </label>
                <input
                  type="text"
                  name="field_of_study"
                  className="form-control"
                  value={formData.field_of_study}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Grade
                </label>
                <input
                  type="text"
                  name="grade"
                  className="form-control"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="CGPA / Percentage"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Start Year
                  </label>
                  <input
                    type="number"
                    name="start_year"
                    className="form-control"
                    value={formData.start_year}
                    onChange={handleChange}
                  />
                </div>







                <div className="col-md-6 mb-3">


                  <label className="form-label">

                    End Year

                  </label>



                  <input

                    type="number"

                    name="end_year"

                    className="form-control"

                    value={formData.end_year}

                    onChange={handleChange}

                  />


                </div>


              </div>

              <div className="mb-3">
                <label className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
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
                  : education
                  ? "Update Education"
                  : "Save Education"
                }
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>


  );


}


export default EducationModal;