function About() {
  return (

        <section id="about" className="about section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>About</h2>
            <p>
              I am a Laravel Full Stack Developer with 3+ years of experience
          building scalable web applications and REST APIs.
            </p>
          </div>
          {/* End Section Title */}
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row gy-4 justify-content-center">
              <div className="col-lg-4">
                <img
                  src="assets/img/my-profile-img.jpg"
                  className="img-fluid"
                  alt
                />
              </div>
              <div className="col-lg-8 content">
                {/* <h2>UI/UX Designer &amp; Web Developer.</h2> */}
                <h2>Full Stack Laravel Developer.</h2>
                <p className="fst-italic py-3">
                  Passionate about backend development,
              API architecture and modern frontend technologies.
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <ul>
                      <li>
                        <i className="bi bi-chevron-right" />{" "}
                        <strong>Birthday:</strong> <span>28 September 1997</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right" />{" "}
                        <strong>GitHub:</strong> <span>https://github.com/KalavalapalliMohan</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right" />{" "}
                        <strong>Phone:</strong> <span>+91 798 103 1675</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right" />{" "}
                        <strong>City:</strong> <span>Andhra Pradesh, India</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul>
                      <li>
                        <i className="bi bi-chevron-right" />{" "}
                        <strong>Age:</strong> <span>28</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right" />{" "}
                        <strong>Degree:</strong> <span>Diploma</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right" />{" "}
                        <strong>Email:</strong> <span>kalavalapallimohan9@gmail.com</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right" />{" "}
                        <strong>Freelance:</strong> <span>Available</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <p className="py-3">
                  Officiis eligendi itaque labore et dolorum mollitia officiis
                  optio vero. Quisquam sunt adipisci omnis et ut. Nulla
                  accusantium dolor incidunt officia tempore. Et eius omnis.
                  Cupiditate ut dicta maxime officiis quidem quia. Sed et
                  consectetur qui quia repellendus itaque neque.
                </p> */}
              </div>
            </div>
          </div>
        </section>
  );
}

export default About;
