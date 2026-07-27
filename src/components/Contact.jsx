import { useEffect, useState } from "react";
import contactService from "../services/contactService";
import settingService from "../services/settingService";

function Contact() {
  const [settings, setSettings] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingService.getSettings();
      setSettings(response.data);
    } catch (error) {
      console.error("Settings Error:", error);
    }
  };

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
    <section id="contact" className="contact section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>

        <p>
          Have a project, freelance opportunity or full-time position? Feel free
          to contact me anytime.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {/* Left */}

          <div className="col-lg-5">
            <div className="info-wrap shadow-sm">
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt"></i>

                <div>
                  <h3>Location</h3>

                  <p>{settings?.location || "Visakhapatnam, India"}</p>
                </div>
              </div>

              <div className="info-item d-flex">
                <i className="bi bi-telephone"></i>

                <div>
                  <h3>Phone</h3>

                  <p>{settings?.phone}</p>
                </div>
              </div>

              <div className="info-item d-flex">
                <i className="bi bi-envelope"></i>

                <div>
                  <h3>Email</h3>

                  <p>{settings?.email}</p>
                </div>
              </div>

              <iframe
                title="Google Map"
                src="https://maps.google.com/maps?q=Visakhapatnam&t=&z=11&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                style={{
                  border: 0,
                  width: "100%",
                  height: "280px",
                  borderRadius: "10px",
                }}
              ></iframe>
            </div>
          </div>

          {/* Right */}

          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="php-email-form shadow-sm">
              <div className="row gy-4">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
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

                <div className="col-md-12 text-center">
                  <button
                    className="btn btn-primary px-5"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Sending..." : "Send Message"}
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
