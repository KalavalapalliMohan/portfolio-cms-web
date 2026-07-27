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
      console.error("Failed to load settings:", error);
    }
  };

  return (
    <footer
      id="footer"
      className="footer position-relative py-4"
      style={{
        background: "#f8f9fa",
        borderTop: "1px solid #e9ecef",
      }}
    >
      <div className="container text-center">

        <h6 className="fw-bold mb-2">
          {settings?.full_name || "Mohan Kalavalapalli"}
        </h6>

        <p className="text-muted mb-2">
          {settings?.title || "Full Stack Laravel Developer"}
        </p>

        <p className="small text-muted mb-0">
          © {new Date().getFullYear()}{" "}
          <strong>{settings?.full_name || "Mohan Kalavalapalli"}</strong>. All
          Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;