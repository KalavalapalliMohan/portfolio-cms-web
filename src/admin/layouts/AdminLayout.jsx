import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import $ from "jquery";

// Make jQuery available for admin template plugins
window.$ = $;
window.jQuery = $;

function AdminLayout() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back to Top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show / Hide Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Load Admin Assets
  useEffect(() => {
    // =========================
    // LOAD ADMIN CSS
    // =========================

    const cssFiles = [
      "/admin-assets/css/bootstrap.min.css",
      "/admin-assets/css/style.css",
    ];

    const loadedCss = cssFiles.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;

      document.head.appendChild(link);

      return link;
    });

    // =========================
    // LOAD ADMIN JS
    // =========================

    const scripts = [
      "/admin-assets/lib/chart/chart.min.js",
      "/admin-assets/js/main.js",
    ];

    const loadedScripts = [];

    const loadScripts = async () => {
      for (const src of scripts) {
        await new Promise((resolve) => {
          const script = document.createElement("script");

          script.src = src;
          script.async = false;

          script.onload = resolve;

          document.body.appendChild(script);

          loadedScripts.push(script);
        });
      }
    };

    loadScripts();

    // =========================
    // CLEANUP
    // =========================

    return () => {
      loadedCss.forEach((css) => css.remove());

      loadedScripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="container-fluid position-relative d-flex p-0">
      {/* Sidebar */}
      <Sidebar />

      <div className="content">
        {/* Navbar */}
        <Navbar />

        <main>
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {showBackToTop && (
        <button
          type="button"
          className="btn btn-lg btn-primary btn-lg-square back-to-top global-add-button"
          onClick={scrollToTop}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

export default AdminLayout;
