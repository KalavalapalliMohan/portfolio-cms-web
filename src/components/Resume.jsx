import React from "react";

const Resume = ({ experiences = [], educations = [] }) => {
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
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>

        <p>
          My professional experience, technical expertise, and educational
          background.
        </p>
      </div>

      <div className="container">
        <div className="row gy-5">
          {/* Experience */}

          <div className="col-lg-6" data-aos="fade-right">
            <h3 className="resume-title">Professional Experience</h3>

            {experiences.map((experience, index) => (
              <div
                className="resume-item"
                key={experience.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h4>{experience.designation}</h4>

                <h5>
                  {formatDate(experience.start_date)} -{" "}
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
                    .map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}

          <div className="col-lg-6" data-aos="fade-left">
            <h3 className="resume-title">Education</h3>

            {educations.map((education, index) => (
              <div
                className="resume-item"
                key={education.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h4>{education.degree}</h4>

                <h5>
                  {education.start_year} - {education.end_year}
                </h5>

                <p>
                  <em>{education.institution}</em>
                </p>

                <p>{education.field_of_study}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
