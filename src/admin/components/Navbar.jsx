import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import settingService from "../../services/settingService";

function Navbar() {
  const [settings, setSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingService.getSettings();
      setSettings(response.data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("token");
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
        <a href="#" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-primary mb-0">
            <i className="fa fa-user-edit" />
          </h2>
        </a>

        <a href="#" className="sidebar-toggler flex-shrink-0">
          <i className="fa fa-bars" />
        </a>

        <form className="d-none d-md-flex ms-4">
          <input
            className="form-control bg-dark border-0"
            type="search"
            placeholder="Search"
          />
        </form>

        <div className="navbar-nav align-items-center ms-auto">
          {/* Messages */}
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-envelope me-lg-2" />
              <span className="d-none d-lg-inline-flex">Message</span>
            </a>

            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item text-center">
                No Messages
              </a>
            </div>
          </div>

          {/* Notifications */}
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-bell me-lg-2" />
              <span className="d-none d-lg-inline-flex">Notifications</span>
            </a>

            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item text-center">
                No Notifications
              </a>
            </div>
          </div>

          {/* Profile */}
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <img
                className="rounded-circle me-2"
                src={
                  settings?.profile_image
                    ? `http://127.0.0.1:8000/storage/settings/${settings.profile_image}`
                    : "/admin-assets/img/user.jpg"
                }
                alt="Profile"
                style={{ width: 40, height: 40 }}
              />

              <div className="d-none d-lg-block text-start">
                <h6 className="mb-0 text-white">
                  {settings?.full_name || "Portfolio Admin"}
                </h6>

                <small className="text-light">
                  {settings?.title || "Administrator"}
                </small>
              </div>
            </a>

            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item">
                <i className="fa fa-user me-2"></i>
                My Profile
              </a>

              <Link
                to="/admin/settings" className="dropdown-item">
                <i className="fa fa-cog me-2"></i>
                Settings
              </Link>

              <button
                type="button"
                className="dropdown-item"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out-alt me-2"></i>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;