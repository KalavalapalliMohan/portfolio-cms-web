import { useEffect, useState } from "react";
import api from "../services/api";

const Resume = () => {
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    fetchExperiences();
    fetchEducations();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await api.get("/experiences");
      setExperiences(response.data.data);
    } catch (error) {
      console.error("Experience API Error:", error);
    }
  };

  const fetchEducations = async () => {
    try {
      const response = await api.get("/educations");
      setEducations(response.data.data);
    } catch (error) {
      console.error("Education API Error:", error);
    }
  };

  return (
    <section id="resume" className="resume section">
      <div className="container section-title">
        <h2>Resume</h2>
        <p>
          My professional experience and educational background.
        </p>
      </div>

      <div className="container">
        <div className="row">

          {/* Experience */}

          <div className="col-lg-6">
            <h3 className="resume-title">Professional Experience</h3>

            {experiences.map((experience) => (
              <div className="resume-item" key={experience.id}>
                <h4>{experience.designation}</h4>

                <h5>
                  {experience.start_date} -{" "}
                  {experience.currently_working ? "Present" : experience.end_date}
                </h5>

                <p>
                  <em>
                    {experience.company_name}, {experience.location}
                  </em>
                </p>

                <p>{experience.description}</p>
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
                  {education.start_year} - {education.end_year}
                </h5>

                <p>
                  <em>{education.institution}</em>
                </p>

                <p>{education.field_of_study}</p>

                <p>Grade: {education.grade}</p>

                <p>{education.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;