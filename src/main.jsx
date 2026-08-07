import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

function Root() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 100,
    });
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Root />
);
