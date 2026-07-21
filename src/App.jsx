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

import AdminLayout from "./admin/layouts/AdminLayout";
import AdminAuthLayout from "./admin/layouts/AdminAuthLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import ProjectList from "./admin/pages/projects/ProjectList";
import SkillList from "./admin/pages/skills/SkillList";
import ExperienceList from "./admin/pages/experiences/ExperienceList";
import EducationList from "./admin/pages/education/EducationList";
import CertificateList from "./admin/pages/certificates/CertificateList";
import Settings from "./admin/pages/settings/Settings";

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
      {/* ========================= */}
      {/* Public Portfolio */}
      {/* ========================= */}
      <Route path="/" element={<PortfolioWebsite />} />

      {/* ========================= */}
      {/* Admin Login */}
      {/* ========================= */}
      <Route element={<AdminAuthLayout />}>

          <Route path="/admin/login" element={<Login />} />

      </Route>

      {/* ========================= */}
      {/* Protected Admin Routes */}
      {/* ========================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="skills" element={<SkillList />} />
        <Route path="Experiences" element={<ExperienceList />} />
        <Route
            path="educations"
            element={<EducationList />}
        />
        <Route
          path="certificates"
          element={<CertificateList />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  );
}

export default App;