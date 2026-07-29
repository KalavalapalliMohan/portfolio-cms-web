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

  const getDescriptionList = (text = "") => {
    return text
      .split("\n")
      .map((item) => item.replace("•", "").trim())
      .filter(Boolean);
  };

  return (
    <section id="resume" className="resume section">
      <div className="container section-title">
        <h2>Resume</h2>

        <p>
          My professional experience, technical expertise and educational
          background.
        </p>
      </div>

      <div className="container">
        {loading ? (
          <div id="preloader"></div>
        ) : (
          <div className="row">
            {/* Experience */}

            <div className="col-lg-6">
              <h3 className="resume-title">Professional Experience</h3>

              {experiences.map((experience) => (
                <div className="resume-item" key={experience.id}>
                  <h4>{experience.designation}</h4>

                  <h5>
                    {formatDate(experience.start_date)}

                    {" - "}

                    {experience.currently_working
                      ? "Present"
                      : formatDate(experience.end_date)}
                  </h5>

                  <p>
                    <em>{experience.company_name}</em>
                  </p>

                  <ul>
                    {getDescriptionList(experience.description)
                      .slice(0, 3)
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}

            <div className="col-lg-6">
              <h3 className="resume-title">Education</h3>

              {educations.map((education) => (
                <div className="resume-item" key={education.id}>
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Resume;
