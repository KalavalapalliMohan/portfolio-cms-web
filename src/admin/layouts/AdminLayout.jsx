import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import $ from "jquery";


// Make jQuery available for admin template plugins
window.$ = $;
window.jQuery = $;


function AdminLayout() {


  useEffect(() => {


    // =========================
    // LOAD ADMIN CSS
    // =========================

    const cssFiles = [
      "/admin-assets/css/bootstrap.min.css",
      "/admin-assets/css/style.css",
      "/admin-assets/lib/owlcarousel/assets/owl.carousel.min.css",
    ];


    const loadedCss = cssFiles.map((href)=>{

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

      // Chart
      "/admin-assets/lib/chart/chart.min.js",


      // jQuery plugins
      "/admin-assets/lib/easing/easing.min.js",

      "/admin-assets/lib/waypoints/waypoints.min.js",

      "/admin-assets/lib/owlcarousel/owl.carousel.min.js",


      // DarkPan main js
      "/admin-assets/js/main.js",

    ];



    const loadedScripts = [];



    const loadScripts = async () => {


      for(const src of scripts){


        await new Promise((resolve)=>{


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

    return ()=>{


      loadedCss.forEach((css)=>{

        css.remove();

      });



      loadedScripts.forEach((script)=>{

        script.remove();

      });


    };


  },[]);




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



      <a 
        href="#"
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
      >

        <i className="bi bi-arrow-up" />

      </a>


    </div>

  );

}


export default AdminLayout;