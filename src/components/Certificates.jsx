import React from "react";

const Certificates = ({ certificates = [] }) => {
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="certificates" className="certificates section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Certificates</h2>

        <p>
          Professional certifications that demonstrate my technical knowledge,
          continuous learning and commitment to software development excellence.
        </p>
      </div>

      <div className="container">
        {certificates.length === 0 ? (
          <div className="text-center">
            <p>No certificates available.</p>
          </div>
        ) : (
          <div className="row gy-4">
            {certificates.map((certificate, index) => (
              <div
                className="col-lg-6 col-md-6"
                key={certificate.id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
              >
                <div className="certificate-card h-100">
                  {certificate.certificate_image_url ? (
                    <img
                      src={certificate.certificate_image_url}
                      alt={certificate.title}
                      className="certificate-image"
                      width="600"
                      height="400"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="certificate-placeholder">
                      <i className="bi bi-patch-check-fill"></i>
                    </div>
                  )}

                  <div className="certificate-content">
                    <h4>{certificate.title}</h4>

                    {certificate.organization && (
                      <span className="certificate-badge">
                        {certificate.organization}
                      </span>
                    )}

                    <p className="certificate-date">
                      <i className="bi bi-calendar-event me-2"></i>
                      {formatDate(certificate.issue_date)}
                    </p>

                    {certificate.certificate_url && (
                      <a
                        href={certificate.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <i className="bi bi-box-arrow-up-right me-2"></i>
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
