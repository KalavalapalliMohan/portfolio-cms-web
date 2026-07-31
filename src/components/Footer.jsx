import { useEffect, useState } from "react";
import settingService from "../services/settingService";

function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingService.getSettings();
      setSettings(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <h3>{settings?.full_name || "Mohan Kalavalapalli"}</h3>

        <p className="footer-tagline">
          {settings?.title || "PHP Laravel Full Stack Developer"}
        </p>

        <div className="footer-social">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <i className="bi bi-github"></i>
          </a>

          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>

          <a href={`mailto:${settings?.email}`}>
            <i className="bi bi-envelope-fill"></i>
          </a>

          <a href={`tel:${settings?.phone}`}>
            <i className="bi bi-telephone-fill"></i>
          </a>
        </div>

        <div className="footer-tech">
          <span>Laravel</span>

          <span>React</span>

          <span>REST API</span>

          <span>MySQL</span>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()}{" "}
          <strong>{settings?.full_name || "Mohan Kalavalapalli"}</strong>
          <br />
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
