function Hero({ settings }) {

  return (
    <section id="hero" className="hero section dark-background">

      <img
        src={
          settings?.profile_image_url ||
          "/assets/img/mohan.jpeg"
        }
        alt="Mohan Kalavalapalli"
        data-aos="fade-in"
      />


      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <h2>
          {settings?.full_name || "Mohan Kalavalapalli"}
        </h2>


        <p>
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
            {settings?.title || "PHP Laravel Full Stack Developer"}
          </span>


          <span
            className="typed-cursor typed-cursor--blink"
            aria-hidden="true"
          />

        </p>



        <div className="hero-buttons mt-4">


          <a
            href="#portfolio"
            className="btn btn-primary me-3"
          >
            View Projects
          </a>



          {settings?.resume_url && (

            <a
              href={settings.resume_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light"
              download
            >
              Download Resume
            </a>

          )}


        </div>



        <div className="mt-4">

          <p className="hero-description">

            Building scalable web applications, REST APIs and modern digital
            solutions using Laravel, React and database technologies.

          </p>

        </div>


      </div>

    </section>
  );
}


export default Hero;