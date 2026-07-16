function Hero() {
  return (
    <section id="hero" className="hero section dark-background">
      <img
        src="assets/img/hero-bg.jpg"
        alt="Hero background"
        data-aos="fade-in"
      />
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <h2>Mohan Kalavalapalli</h2>
        <p>
          I'm a <span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer">
            Laravel Full Stack Developer
          </span>
          <span
            className="typed-cursor typed-cursor--blink"
            aria-hidden="true"
          />
          <span
            className="typed-cursor typed-cursor--blink"
            aria-hidden="true"
          />
        </p>
      </div>
    </section>
  );
}

export default Hero;
