import React from "react";

function About({ settings }) {
  return (
    <section id="about" className="about section">
      {/* Section Title */}

      <div
        className="container section-title"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2>About Me</h2>

        <p>
          {settings?.about ||
            "Full Stack Laravel Developer building scalable web applications and REST APIs."}
        </p>
      </div>

      <div className="container">
        <div className="row gy-5 align-items-center">
          {/* Profile Image */}

          <div
            className="col-lg-4 text-center"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <img
              src={settings?.profile_image_url || "/assets/img/mohan.webp"}
              className="img-fluid about-image"
              alt={settings?.full_name || "Profile Image"}
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Content */}

          <div
            className="col-lg-8 content"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h2>{settings?.title || "Full Stack Laravel Developer"}</h2>

            <p className="fst-italic about-intro">
              Passionate about backend architecture, REST API development,
              scalable applications, and modern frontend technologies. I focus
              on writing clean, maintainable, and efficient code that delivers
              real business value.
            </p>

            <div className="row mt-4">
              <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                <ul>
                  <li>
                    <i className="bi bi-person-fill"></i>
                    <strong>Name:</strong>
                    <span>{settings?.full_name || "-"}</span>
                  </li>

                  <li>
                    <i className="bi bi-telephone-fill"></i>
                    <strong>Phone:</strong>
                    <span>{settings?.phone || "-"}</span>
                  </li>

                  <li>
                    <i className="bi bi-geo-alt-fill"></i>
                    <strong>Location:</strong>
                    <span>{settings?.location || "-"}</span>
                  </li>

                  <li>
                    <i className="bi bi-briefcase-fill"></i>
                    <strong>Experience:</strong>
                    <span>3+ Years</span>
                  </li>
                </ul>
              </div>

              <div className="col-md-6" data-aos="fade-up" data-aos-delay="450">
                <ul>
                  <li>
                    <i className="bi bi-envelope-fill"></i>
                    <strong>Email:</strong>
                    <span>{settings?.email || "-"}</span>
                  </li>

                  <li>
                    <i className="bi bi-mortarboard-fill"></i>
                    <strong>Degree:</strong>
                    <span>Diploma</span>
                  </li>

                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <strong>Freelance:</strong>
                    <span>Available</span>
                  </li>

                  <li>
                    <i className="bi bi-code-slash"></i>
                    <strong>Skills:</strong>
                    <span>Laravel, React, PostgreSQL</span>
                  </li>
                </ul>
              </div>
            </div>

            <p
              className="about-description"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              I specialize in Laravel application development, REST API design,
              database architecture, authentication systems, and modern React
              applications. My goal is to build secure, scalable, and
              high-performance software that provides an excellent user
              experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
