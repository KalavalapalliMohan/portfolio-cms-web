import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function AdminAuthLayout() {

  useEffect(() => {

    const cssFiles = [
      "/admin-assets/lib/owlcarousel/assets/owl.carousel.min.css",
      "/admin-assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css",
      "/admin-assets/css/bootstrap.min.css",
      "/admin-assets/css/style.css",
    ];

    const links = cssFiles.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    const jsFiles = [
      "https://code.jquery.com/jquery-3.4.1.min.js",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js",

      "/admin-assets/lib/chart/chart.min.js",
      "/admin-assets/lib/easing/easing.min.js",
      "/admin-assets/lib/waypoints/waypoints.min.js",
      "/admin-assets/lib/owlcarousel/owl.carousel.min.js",
      "/admin-assets/lib/tempusdominus/js/moment.min.js",
      "/admin-assets/lib/tempusdominus/js/moment-timezone.min.js",
      "/admin-assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js",
      "/admin-assets/js/main.js",
    ];

    const scripts = [];

    const load = async () => {
      for (const src of jsFiles) {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
        scripts.push(script);

        await new Promise((resolve) => {
          script.onload = resolve;
          script.onerror = resolve;
        });
      }
    };

    load();

    return () => {
      links.forEach((l) => l.remove());
      scripts.forEach((s) => s.remove());
    };

  }, []);

  return <Outlet />;
}

export default AdminAuthLayout;