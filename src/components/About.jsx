import { useEffect, useState } from "react";

import settingService from "../services/settingService";

function About() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingService.getSettings();

      // console.log("aboute setting", response)

      setSettings(response.data);
    } catch (error) {
      console.error("Failed to load settings", error);
    }
  };
    // console.log("aboute setting", settings)
  return (
    <section id="about" className="about section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>About</h2>

        <p>
          {settings?.about ||
            "Full Stack Laravel Developer building scalable web applications and REST APIs."}
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center">
          {/* Profile Image */}
          <div className="col-lg-4">
            <img
              src={
                settings?.profile_image_url || "/assets/img/user.jpeg"
              }
              className="img-fluid rounded"
              alt={settings?.full_name || "Profile Image"}
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="col-lg-8 content">
            <h2>{settings?.title || "Full Stack Laravel Developer"}</h2>

            <p className="fst-italic py-3">
              Passionate about backend architecture, REST API development and
              modern frontend technologies. I focus on creating clean, scalable
              and user-friendly applications.
            </p>

            <div className="row">
              {/* Left Details */}
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i className="bi bi-chevron-right"></i>

                    <strong>Name:</strong>

                    <span>{settings?.full_name || "-"}</span>
                  </li>

                  <li>
                    <i className="bi bi-chevron-right"></i>

                    <strong>Phone:</strong>

                    <span>{settings?.phone || "-"}</span>
                  </li>

                  <li>
                    <i className="bi bi-chevron-right"></i>

                    <strong>Location:</strong>

                    <span>{settings?.location || "-"}</span>
                  </li>

                  <li>
                    <i className="bi bi-chevron-right"></i>

                    <strong>Experience:</strong>

                    <span>3+ Years</span>
                  </li>
                </ul>
              </div>

              {/* Right Details */}
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i className="bi bi-chevron-right"></i>

                    <strong>Email:</strong>

                    <span>{settings?.email || "-"}</span>
                  </li>

                  <li>
                    <i className="bi bi-chevron-right"></i>

                    <strong>Degree:</strong>

                    <span>Diploma</span>
                  </li>

                  <li>
                    <i className="bi bi-chevron-right"></i>

                    <strong>Freelance:</strong>

                    <span>Available</span>
                  </li>

                  <li>
                    <i className="bi bi-chevron-right"></i>

                    <strong>Skills:</strong>

                    <span>Laravel, React, MySQL</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="py-3">
              I specialize in developing robust Laravel applications, REST APIs,
              database design, and integrating modern frontend solutions. I
              enjoy solving real-world problems through technology and
              continuously improving my skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
