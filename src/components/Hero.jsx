function Hero({ settings }) {
  return (
    <section id="hero" className="hero section">
      <img
        src={settings?.profile_image_url || "/assets/img/mohan.webp"}
        alt={settings?.full_name || "Mohan Kalavalapalli"}
        className="hero-bg-image"
        width="400"
        height="400"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        data-aos="zoom-out"
        data-aos-duration="1200"
      />

      <div className="hero-overlay"></div>

      <div className="container">
        <div className="hero-content">
          <h1 data-aos="fade-up" data-aos-delay="100">
            {settings?.full_name}
          </h1>

          <p className="hero-title" data-aos="fade-up" data-aos-delay="250">
            I'm a{" "}
            <span
              className="typed"
              data-typed-items="
              Laravel Developer,
              Full Stack Developer,
              REST API Developer,
              React Developer
            "
            >
              {settings?.title}
            </span>
            <span
              className="typed-cursor typed-cursor--blink"
              aria-hidden="true"
            />
          </p>

          <p
            className="hero-description"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Passionate Full Stack Developer specializing in Laravel, React, REST
            APIs, PostgreSQL, and modern cloud-based web applications.
          </p>

          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="550">
            <a href="#portfolio" className="btn btn-primary">
              View Projects
            </a>

            {settings?.resume_url && (
              <a
                href={settings.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn btn-outline-light"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
