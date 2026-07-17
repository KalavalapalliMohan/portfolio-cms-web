import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminLayout() {
  useEffect(() => {
    // CSS


    const owlcarousel = document.createElement("link");
    owlcarousel.rel = "stylesheet";
    owlcarousel.href = "/admin-assets/lib/owlcarousel/assets/owl.carousel.min.css";

    const tempusdominus = document.createElement("link");
    tempusdominus.rel = "stylesheet";
    tempusdominus.href = "/admin-assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";


    const bootstrapCss = document.createElement("link");
    bootstrapCss.rel = "stylesheet";
    bootstrapCss.href = "/admin-assets/css/bootstrap.min.css";

    const styleCss = document.createElement("link");
    styleCss.rel = "stylesheet";
    styleCss.href = "/admin-assets/css/style.css";



    document.head.appendChild(bootstrapCss);
    document.head.appendChild(styleCss);
    document.head.appendChild(owlcarousel);
    document.head.appendChild(tempusdominus);

    // JS


    const chart = document.createElement("script");
    chart.src = "/admin-assets/lib/chart/chart.min.js";

    const easing = document.createElement("script");
    easing.src = "/admin-assets/lib/easing/easing.min.js";

    const waypoints = document.createElement("script");
    waypoints.src = "/admin-assets/lib/waypoints/waypoints.min.js";

    const owlcarouselJS = document.createElement("script");
    owlcarouselJS.src = "/admin-assets/lib/owlcarousel/owl.carousel.min.js";

      const tempusdominusJs = document.createElement("script");
    tempusdominusJs.src = "/admin-assets/lib/tempusdominus/js/moment.min.js";

    const tempusdominusTimezone = document.createElement("script");
    tempusdominusTimezone.src = "/admin-assets/lib/tempusdominus/js/moment-timezone.min.js";

    const tempusdominusBootstrap = document.createElement("script");
    tempusdominusBootstrap.src = "/admin-assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js";


    const bootstrapJs = document.createElement("script");
    bootstrapJs.src = "/admin-assets/js/bootstrap.bundle.min.js";

    const mainJs = document.createElement("script");
    mainJs.src = "/admin-assets/js/main.js";

    document.body.appendChild(bootstrapJs);
    document.body.appendChild(mainJs);
    document.body.appendChild(chart);
    document.body.appendChild(easing);
    document.body.appendChild(waypoints);
    document.body.appendChild(owlcarouselJS);
    document.body.appendChild(tempusdominusJs);
    document.body.appendChild(tempusdominusTimezone);
    document.body.appendChild(tempusdominusBootstrap);

    return () => {
      bootstrapCss.remove();
      styleCss.remove();
      bootstrapJs.remove();
      mainJs.remove();
      owlcarouselJS.remove();
      tempusdominusJs.remove();
      chart.remove();
      easing.remove();
      waypoints.remove();
      tempusdominusTimezone.remove();
      tempusdominusBootstrap.remove();

    };
  }, []);

  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">

        {/* <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> */}

        <Sidebar />

        <div className="content">
          
          <Navbar />

          <main>
            <Outlet />
          </main>

          <Footer />
        </div>
        
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
      </div>
    </>
  );
}

export default AdminLayout;