import { useState } from "react";
import contactService from "../services/contactService";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await contactService.sendMessage(form);

            alert("Message sent successfully.");

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message || "Failed to send message."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
                <p>
                    Necessitatibus eius consequatur ex aliquid fuga eum quidem
                    sint consectetur velit.
                </p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="row gy-4">

                    <div className="col-lg-5">
                        <div className="info-wrap">

                            <div
                                className="info-item d-flex"
                                data-aos="fade-up"
                                data-aos-delay={200}
                            >
                                <i className="bi bi-geo-alt flex-shrink-0"></i>
                                <div>
                                    <h3>Address</h3>
                                    <p>A108 Adam Street, New York, NY 535022</p>
                                </div>
                            </div>

                            <div
                                className="info-item d-flex"
                                data-aos="fade-up"
                                data-aos-delay={300}
                            >
                                <i className="bi bi-telephone flex-shrink-0"></i>
                                <div>
                                    <h3>Call Us</h3>
                                    <p>+1 5589 55488 55</p>
                                </div>
                            </div>

                            <div
                                className="info-item d-flex"
                                data-aos="fade-up"
                                data-aos-delay={400}
                            >
                                <i className="bi bi-envelope flex-shrink-0"></i>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>info@example.com</p>
                                </div>
                            </div>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                                style={{
                                    border: 0,
                                    width: "100%",
                                    height: "270px",
                                }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            ></iframe>

                        </div>
                    </div>

                    <div className="col-lg-7">

                        <form
                            className="php-email-form"
                            onSubmit={handleSubmit}
                            data-aos="fade-up"
                            data-aos-delay={200}
                        >

                            <div className="row gy-4">

                                <div className="col-md-6">
                                    <label className="pb-2">
                                        Your Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="pb-2">
                                        Your Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label className="pb-2">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label className="pb-2">
                                        Message
                                    </label>

                                    <textarea
                                        className="form-control"
                                        name="message"
                                        rows="6"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-md-12 text-center">

                                    {loading && (
                                        <div className="loading">
                                            Sending...
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Sending..."
                                            : "Send Message"}
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