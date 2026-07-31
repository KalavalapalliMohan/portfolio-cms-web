function Services() {
  const services = [
    {
      id: 1,
      icon: "bi bi-code-slash",
      title: "Laravel Development",
      description:
        "Building scalable Laravel applications with clean architecture, reusable code, authentication, authorization and RESTful APIs.",
    },
    {
      id: 2,
      icon: "bi bi-diagram-3",
      title: "REST API Development",
      description:
        "Designing secure, high-performance REST APIs using Laravel Sanctum, API Resources, Form Requests and Swagger documentation.",
    },
    {
      id: 3,
      icon: "bi bi-window-stack",
      title: "React Frontend",
      description:
        "Creating responsive React applications with reusable components, Axios integration, protected routes and modern UI practices.",
    },
    {
      id: 4,
      icon: "bi bi-database",
      title: "Database Design",
      description:
        "Designing and optimizing MySQL & PostgreSQL databases with indexing, relationships, migrations and performance tuning.",
    },
    {
      id: 5,
      icon: "bi bi-credit-card",
      title: "Third-Party Integration",
      description:
        "Integrating Razorpay, payment gateways, email services and external APIs to extend application functionality.",
    },
    {
      id: 6,
      icon: "bi bi-cloud-upload",
      title: "Deployment & Maintenance",
      description:
        "Deploying Laravel applications, fixing bugs, improving performance, maintaining production systems and continuous enhancements.",
    },
  ];

  return (
    <section id="services" className="services section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>

        <p>
          I build secure, scalable and high-performance web applications using
          Laravel, React, REST APIs and modern web technologies.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="col-lg-4 col-md-6"
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
            >
              <div className="service-item h-100">
                <div className="icon">
                  <i className={service.icon}></i>
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
