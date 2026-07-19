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

  return (
    <section id="certificates" className="resume section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Certificates</h2>
        <p>
          Professional certifications that validate my technical skills and
          continuous learning.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="resume-title">Professional Certificates</h3>

            {loading ? (
              <p>Loading certificates...</p>
            ) : certificates.length === 0 ? (
              <p>No certificates found.</p>
            ) : (
              certificates.map((certificate) => (
                <div className="resume-item" key={certificate.id}>
                  <h4>{certificate.title}</h4>

                  <h5>{certificate.issue_date}</h5>

                  <p>
                    <em>{certificate.organization}</em>
                  </p>

                  {certificate.certificate_image_url && (
                    <img
                      src={certificate.certificate_image_url}
                      alt={certificate.title}
                      className="img-fluid rounded shadow-sm mt-3 mb-3"
                      style={{ maxWidth: "350px" }}
                    />
                  )}

                  {certificate.certificate_url && (
                    <div>
                      <a
                        href={certificate.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;