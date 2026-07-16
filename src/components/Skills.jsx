function Skills() {
  return (
        <section id="skills" className="skills section light-background">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Skills</h2>
            <p>
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>
          {/* End Section Title */}
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row skills-content skills-animation">
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill">
                    <span>Laravel</span> <i className="val">90%</i>
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* End Skills Item */}
                <div className="progress">
                  <span className="skill">
                    <span>PHP</span> <i className="val">90%</i>
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={90}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* End Skills Item */}
                <div className="progress">
                  <span className="skill">
                    <span>React</span> <i className="val">70%</i>
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* End Skills Item */}
              </div>
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill">
                    <span>PostgreSQL</span> <i className="val">75%</i>
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={80}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* End Skills Item */}
                <div className="progress">
                  <span className="skill">
                    <span>javaScript</span> <i className="val">70%</i>
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={90}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* End Skills Item */}
                <div className="progress">
                  <span className="skill">
                    <span>HTML</span> <i className="val">90%</i>
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={55}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* End Skills Item */}
              </div>
            </div>
          </div>
        </section>
  );
}

export default Skills;
