import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";
import settingService from "../../services/settingService";
import messageService from "../../services/messageService";


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [settings, setSettings] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestMessages, setLatestMessages] = useState([]);

  useEffect(() => {
    fetchSettings();
    fetchUnreadMessages();

    const interval = setInterval(() => {
      fetchUnreadMessages();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingService.getSettings();
      setSettings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUnreadMessages = async () => {
    try {
      const response = await messageService.getUnreadMessages();

      setUnreadCount(response.data.count);
      setLatestMessages(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await logout();

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/admin/login", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong.",
      });
    }
  };


  

  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">

      <button
        type="button"
        className="sidebar-toggler btn btn-link text-white p-0 border-0"
      >
        <i className="fa fa-bars"></i>
      </button>

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

          <button
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-envelope me-lg-2"></i>

            {unreadCount > 0 && (
              <span
                className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger"
              >
                {unreadCount}
              </span>
              
            )}
            <span className="d-none d-lg-inline-flex">
                Message
              </span>
          </button>

            <div className="dropdown-menu dropdown-menu-end messages-dropdown bg-secondary border-0 rounded-0 rounded-bottom m-0">

            {latestMessages.length > 0 ? (
              latestMessages.map((message) => (
                <Link
                  key={message.id}
                  to="/admin/messages"
                  className="dropdown-item"
                >
                  <strong>{message.name}</strong>
                  <div className="row">
                    <div className="col-7">
                        <p className="small text-muted">
                          {message.subject}
                        </p>
                    </div>
                      <div className="col-5">
                        <small className="text-muted">
                            {dayjs(message.created_at).fromNow()}
                        </small>
                    </div>

                  </div>


                </Link>
              ))
            ) : (
              <div className="dropdown-item text-center">
                No unread messages
              </div>
            )}

            <div className="dropdown-divider"></div>

            <Link
              to="/admin/messages"
              className="dropdown-item text-center"
            >
              View All Messages
            </Link>

          </div>

        </div>

        {/* Profile */}
        <div className="nav-item dropdown">

          <button
            className="nav-link dropdown-toggle bg-transparent border-0 text-white d-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <img
              className="rounded-circle me-2"
              src={
                settings?.profile_image
                  ? `http://127.0.0.1:8000/storage/settings/${settings.profile_image}`
                  : "/admin-assets/img/user.jpeg"
              }
              alt="Profile"
              width="40"
              height="40"
            />

          </button>

          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-bottom m-0">

            <Link
              to="/admin/settings"
              className="dropdown-item"
            >
              <i className="fa fa-cog me-2"></i>
              Settings
            </Link>

            <button
              className="dropdown-item"
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out-alt me-2"></i>
              Logout
            </button>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;