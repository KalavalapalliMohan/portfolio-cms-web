import { useState } from "react";
import contactService from "../services/contactService";

function Contact({ settings }) {
  // console.log("Contact settings:", settings); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await contactService.sendMessage(form);

      alert("✅ Message sent successfully.");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>

        <p>
          Have a project, freelance opportunity or a full-time position? I'd
          love to hear from you. Let's build something amazing together.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {/* LEFT */}

          <div className="col-lg-5" data-aos="fade-right">
            <div className="info-wrap">
              <div className="info-item">
                <div className="info-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>

                <div>
                  <h3>Location</h3>
                  <p>{settings?.location}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>

                <div>
                  <h3>Phone</h3>
                  <p>{settings?.phone}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>

                <div>
                  <h3>Email</h3>
                  <p>{settings?.email}</p>
                </div>
              </div>

              <div className="contact-map">
                <iframe
                  title="Google Map"
                  src="https://maps.google.com/maps?q=Visakhapatnam&t=&z=11&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="col-lg-7" data-aos="fade-left" data-aos-delay="100">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row gy-4">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email Address</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Subject</label>

                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Project discussion"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Message</label>

                  <textarea
                    rows="6"
                    name="message"
                    className="form-control"
                    placeholder="Write your message..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-md-12">
                  <button
                    type="submit"
                    className="contact-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
