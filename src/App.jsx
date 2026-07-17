import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Resume from "./components/Resume";
import Certificates from "./components/Certificates";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function PortfolioWebsite() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Certificates />
        <Portfolio />
        <Services />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<PortfolioWebsite />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;