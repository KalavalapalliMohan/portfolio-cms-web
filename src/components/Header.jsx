import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header({ settings, socialLinks = [] }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      const scrollY = window.scrollY + 150;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    document.querySelector("#header").classList.toggle("header-show");
  };

  const closeMobileMenu = () => {
    document.querySelector("#header").classList.remove("header-show");
  };

  const menuItems = [
    {
      id: "hero",
      icon: "bi-house",
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
      icon: "bi-hdd-stack",
      label: "Services",
    },

    {
      id: "contact",
      icon: "bi-envelope",
      label: "Contact",
    },
  ];

  return (
    <header id="header" className="header dark-background d-flex flex-column">
      {/* Mobile Toggle */}

      <i
        className="header-toggle d-xl-none bi bi-list"
        onClick={toggleMobileMenu}
      />

      {/* Profile */}

      <div className="profile-img">
        <img
          src={settings?.profile_image_url || "/assets/img/mohan.jpeg"}
          alt={settings?.full_name || "Mohan Kalavalapalli"}
          className="img-fluid rounded-circle"
          loading="lazy"
        />
      </div>

      {/* Logo */}

      <Link
        to="/"
        className="logo d-flex align-items-center justify-content-center"
      >
        <h1 className="sitename">
          {settings?.full_name || "Mohan Kalavalapalli"}
        </h1>
      </Link>

      {/* Social Links */}

      <div className="social-links text-center">
        {socialLinks.length > 0 ? (
          socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className={item.platform?.toLowerCase()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={item.icon}></i>
            </a>
          ))
        ) : (
          <>
            <a href="#">
              <i className="bi bi-linkedin"></i>
            </a>

            <a href="#">
              <i className="bi bi-github"></i>
            </a>

            <a href="#">
              <i className="bi bi-twitter-x"></i>
            </a>

            <a href="#">
              <i className="bi bi-instagram"></i>
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
