import { useEffect, useState } from "react";
import api from "../api/axios";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await api.get("/certificates");
      setCertificates(response.data.data);
    } catch (error) {
      console.error("Certificate API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="certificates" className="section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Certificates</h2>

        <p>
          Professional certifications that demonstrate my technical knowledge,
          continuous learning and commitment to software development excellence.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {loading ? (
          <div className="text-center">
            <p>Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center">
            <p>No certificates available.</p>
          </div>
        ) : (
          <div className="row gy-4">
            {certificates.map((certificate) => (
              <div className="col-lg-6 col-md-6" key={certificate.id}>
                <div className="card h-100 shadow-sm border-0">
                  {certificate.certificate_image_url ? (
                    <img
                      src={certificate.certificate_image_url}
                      alt={certificate.title}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-light"
                      style={{ height: "220px" }}
                    >
                      <i
                        className="bi bi-patch-check-fill"
                        style={{
                          fontSize: "70px",
                          color: "#149ddd",
                        }}
                      ></i>
                    </div>
                  )}

                  <div className="card-body">
                    <h4 className="card-title">{certificate.title}</h4>

                    <span className="badge bg-primary mb-3">
                      {certificate.organization}
                    </span>

                    <p className="text-muted mb-3">
                      <i className="bi bi-calendar-event"></i>{" "}
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
