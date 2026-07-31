function Skills({ skills = [] }) {
  const leftSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const rightSkills = skills.slice(Math.ceil(skills.length / 2));

  const SkillItem = ({ skill, delay = 0 }) => (
    <div className="skill-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="progress">
        <span className="skill">
          <span>{skill.name}</span>

          <i className="val">{skill.percentage}%</i>
        </span>

        <div className="progress-bar-wrap">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${skill.percentage}%`,
            }}
            aria-valuenow={skill.percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="skills section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Skills</h2>

        <p>
          Technologies and tools I use to build scalable web applications, REST
          APIs, and modern digital solutions.
        </p>
      </div>

      <div className="container">
        <div className="row skills-content">
          <div className="col-lg-6" data-aos="fade-right">
            {leftSkills.map((skill, index) => (
              <SkillItem key={skill.id} skill={skill} delay={index * 100} />
            ))}
          </div>

          <div className="col-lg-6" data-aos="fade-left">
            {rightSkills.map((skill, index) => (
              <SkillItem key={skill.id} skill={skill} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
