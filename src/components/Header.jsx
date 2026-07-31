import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header({ settings, socialLinks = [] }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    document.getElementById("header")?.classList.toggle("header-show");
  };

  const closeMobileMenu = () => {
    document.getElementById("header")?.classList.remove("header-show");
  };

  const menuItems = [
    {
      id: "hero",
      icon: "bi-house-door",
      label: "Home",
    },
    {
      id: "about",
      icon: "bi-person",
      label: "About",
    },
    {
      id: "skills",
      icon: "bi-bar-chart",
      label: "Skills",
    },
    {
      id: "resume",
      icon: "bi-file-earmark-text",
      label: "Resume",
    },
    {
      id: "certificates",
      icon: "bi-award",
      label: "Certificates",
    },
    {
      id: "portfolio",
      icon: "bi-images",
      label: "Portfolio",
    },
    {
      id: "services",
      icon: "bi-grid",
      label: "Services",
    },
    {
      id: "contact",
      icon: "bi-envelope",
      label: "Contact",
    },
  ];

  return (
    <header id="header" className="header d-flex flex-column">
      {/* Mobile Toggle */}

      <button
        className="header-toggle d-xl-none"
        onClick={toggleMobileMenu}
        aria-label="Toggle Navigation"
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Profile */}

      <div className="profile-img">
        <img
          src={settings?.profile_image_url || "/assets/img/mohan.webp"}
          alt={settings?.full_name || "Profile"}
          className="img-fluid rounded-circle"
          loading="lazy"
        />
      </div>

      {/* Logo */}

      <Link to="/" className="logo text-center">
        <h1 className="sitename">
          {settings?.full_name || "Mohan Kalavalapalli"}
        </h1>

        <span className="designation">
          {settings?.title || "Laravel Full Stack Developer"}
        </span>
      </Link>

      {/* Social */}

      <div className="social-links">
        {socialLinks.length > 0 ? (
          socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={item.platform}
            >
              <i className={item.icon}></i>
            </a>
          ))
        ) : (
          <>
            <a href="#">
              <i className="bi bi-github"></i>
            </a>

            <a href="#">
              <i className="bi bi-linkedin"></i>
            </a>

            <a href="#">
              <i className="bi bi-envelope-fill"></i>
            </a>
          </>
        )}
      </div>

      {/* Navigation */}

      <nav id="navmenu" className="navmenu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                onClick={() => {
                  setActiveSection(item.id);
                  closeMobileMenu();
                }}
              >
                <i className={`bi ${item.icon} navicon`}></i>

                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
