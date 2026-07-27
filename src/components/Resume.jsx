import { useEffect, useState } from "react";
import api from "../api/axios";

const Resume = () => {
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const [experienceResponse, educationResponse] = await Promise.all([
        api.get("/experiences"),
        api.get("/educations"),
      ]);

      setExperiences(experienceResponse.data.data || []);
      setEducations(educationResponse.data.data || []);
    } catch (error) {
      console.error("Resume API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getDescriptionList = (text = "") =>
    text
      .split("\n")
      .map((item) => item.replace("•", "").trim())
      .filter(Boolean);

  return (
    <section id="resume" className="resume section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>

        <p>
          My professional experience, technical expertise and educational
          background.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {loading ? (
          <div className="text-center py-5">
            <h5>Loading Resume...</h5>
          </div>
        ) : (
          <div className="row">
            {/* EXPERIENCE */}

            <div className="col-lg-6">
              <h3 className="resume-title mb-4">Professional Experience</h3>

              {experiences.length === 0 ? (
                <p>No experience found.</p>
              ) : (
                experiences.map((experience) => {
                  const description = getDescriptionList(
                    experience.description,
                  );

                  return (
                    <div className="resume-item shadow-sm" key={experience.id}>
                      <h4>{experience.designation}</h4>

                      <h5>
                        {formatDate(experience.start_date)}

                        {" - "}

                        {experience.currently_working
                          ? "Present"
                          : formatDate(experience.end_date)}
                      </h5>

                      <p className="company-name">
                        <em>
                          {experience.company_name}

                          {experience.location && ` • ${experience.location}`}
                        </em>
                      </p>

                      <ul className="resume-description">
                        {description.slice(0, 3).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                      {description.length > 3 && (
                        <button
                          className="btn btn-link p-0 text-decoration-none"
                          data-bs-toggle="modal"
                          data-bs-target="#experienceModal"
                          onClick={() => setSelectedExperience(experience)}
                        >
                          Read More →
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* EDUCATION */}

            <div className="col-lg-6">
              <h3 className="resume-title mb-4">Education</h3>

              {educations.length === 0 ? (
                <p>No education found.</p>
              ) : (
                educations.map((education) => (
                  <div className="resume-item shadow-sm" key={education.id}>
                    <h4>{education.degree}</h4>

                    <h5>
                      {education.start_year}

                      {" - "}

                      {education.end_year}
                    </h5>

                    <p>
                      <em>{education.institution}</em>
                    </p>

                    <p>{education.field_of_study}</p>

                    {education.grade && (
                      <p>
                        <strong>Grade :</strong> {education.grade}
                      </p>
                    )}

                    {education.description && <p>{education.description}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* EXPERIENCE MODAL */}

      <div
        className="modal fade"
        id="experienceModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{selectedExperience?.designation}</h4>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <h6 className="text-primary mb-3">
                {selectedExperience?.company_name}
              </h6>

              <p className="text-muted">
                {selectedExperience &&
                  `${formatDate(selectedExperience.start_date)} - ${
                    selectedExperience.currently_working
                      ? "Present"
                      : formatDate(selectedExperience.end_date)
                  }`}
              </p>

              <ul>
                {selectedExperience &&
                  getDescriptionList(selectedExperience.description).map(
                    (item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ),
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
