import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import settingService from "../../services/settingService";

function Sidebar() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingService.getSettings();

      setSettings(response.data);
    } catch (error) {
      console.log("Settings Error:", error);
    }
  };

  return (
    <>
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-secondary navbar-dark">

          <Link
            to="/admin/dashboard"
            className="navbar-brand mx-4 mb-3"
          >
            <h3 className="text-primary mb-0">
              <i className="fa fa-laptop-code me-2"></i>
              Portfolio CMS
            </h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src={
                  settings?.profile_image
                    ? `http://127.0.0.1:8000/storage/settings/${settings.profile_image}`
                    : "/admin-assets/img/user.jpg"
                }
                alt="User"
                style={{ width: 60, height: 80 }}
              />

              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>

            <div className="ms-3">
              <h6 className="mb-0">
                {settings?.full_name || "Portfolio Admin"}
              </h6>

              <small className="text-muted">
                {settings?.title || "Administrator"}
              </small>
            </div>
          </div>


          <div className="navbar-nav w-100">

            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              <i className="fa fa-tachometer-alt me-2"></i>
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/projects"
              className={({ isActive }) =>
                `nav-item nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="fa fa-folder me-2"></i>
              Projects
            </NavLink>

            <NavLink
              to="/admin/skills"
              className={({ isActive }) =>
                `nav-item nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="fa fa-code me-2"></i>
              Skills
            </NavLink>

            <NavLink
              to="/admin/experiences"
              className={({ isActive }) =>
                `nav-item nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="fa fa-briefcase me-2"></i>
              Experience
            </NavLink>

            <NavLink
              to="/admin/educations"
              className={({ isActive }) =>
                `nav-item nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="fa fa-graduation-cap me-2"></i>
              Education
            </NavLink>

            <NavLink
              to="/admin/certificates"
              className={({ isActive }) =>
                `nav-item nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="fa fa-certificate me-2"></i>
              Certificates
            </NavLink>

            <NavLink
              to="/admin/messages"
              className={({ isActive }) =>
                `nav-item nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="fa fa-envelope me-2"></i>
              Messages
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `nav-item nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="fa fa-cog me-2"></i>
              Settings
            </NavLink>

          </div>

        </nav>
      </div>
    </>
  );
}

export default Sidebar;