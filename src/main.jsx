import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

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
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );

}


ReactDOM.createRoot(document.getElementById("root"))
.render(
  <Root />
);