function Skills({ skills = [] }) {
  // Split skills into two columns

  const leftSkills = skills.slice(0, Math.ceil(skills.length / 2));

  const rightSkills = skills.slice(Math.ceil(skills.length / 2));

  const SkillItem = ({ skill }) => (
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
  );

  return (
    <section id="skills" className="skills section light-background">
      {/* Section Title */}

      <div className="container section-title" data-aos="fade-up">
        <h2>Skills</h2>

        <p>
          Technologies and tools I use to build scalable web applications and
          modern digital solutions.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row skills-content skills-animation">
          {/* Left Column */}

          <div className="col-lg-6">
            {leftSkills.map((skill) => (
              <SkillItem key={skill.id} skill={skill} />
            ))}
          </div>

          {/* Right Column */}

          <div className="col-lg-6">
            {rightSkills.map((skill) => (
              <SkillItem key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
