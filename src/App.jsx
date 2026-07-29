import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import settingService from "./services/settingService";
import projectService from "./services/projectService";
import publicSkillService from "./services/publicSkillService";
import publicExperienceService from "./services/publicExperienceService";
import certificateService from "./services/certificateService";
import publicSocialLinkService from "./services/publicSocialLinkService";

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

import ProtectedRoute from "./admin/layouts/ProtectedRoute";
import GuestRoute from "./admin/layouts/GuestRoute";

import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";

import ProjectList from "./admin/pages/projects/ProjectList";
import SkillList from "./admin/pages/skills/SkillList";
import ExperienceList from "./admin/pages/experiences/ExperienceList";
import EducationList from "./admin/pages/education/EducationList";
import CertificateList from "./admin/pages/certificates/CertificateList";
import Settings from "./admin/pages/settings/Settings";
import MessageList from "./admin/pages/messages/MessageList";
import SocialLinks from "./admin/pages/social-links/SocialLinks";

function PortfolioWebsite() {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState(null);

  const [projects, setProjects] = useState([]);

  const [skills, setSkills] = useState([]);

  const [experiences, setExperiences] = useState([]);

  const [certificates, setCertificates] = useState([]);

  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const [
          settingsResponse,

          skillsResponse,

          projectsResponse,

          experiencesResponse,

          certificatesResponse,

          socialLinksResponse,
        ] = await Promise.all([
          settingService.getSettings(),

          publicSkillService.getSkills(),

          projectService.getProjects(),

          publicExperienceService.getExperiences(),

          certificateService.getCertificates(),

          publicSocialLinkService.getSocialLinks(),
        ]);

        // console.log("Settings API:", settingsResponse);

        setSettings(settingsResponse.data);

        setSkills(skillsResponse.data || []);

        setProjects(projectsResponse.data || []);

        setExperiences(experiencesResponse.data || []);

        setCertificates(certificatesResponse.data || []);

        setSocialLinks(socialLinksResponse.data || []);
      } catch (error) {
        console.error("Portfolio loading failed", error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  if (loading) {
    return <div id="preloader"></div>;
  }

  return (
    <>
      <Header settings={settings} socialLinks={socialLinks} />

      <main>
        <Hero settings={settings} />

        <About settings={settings} />

        <Skills skills={skills} />

        <Resume experiences={experiences} />

        <Certificates certificates={certificates} />

        <Portfolio projects={projects} />

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
      {/* Public Portfolio */}

      <Route path="/" element={<PortfolioWebsite />} />

      {/* Guest Routes */}

      <Route element={<GuestRoute />}>
        <Route element={<AdminAuthLayout />}>
          <Route path="/admin/login" element={<Login />} />
        </Route>
      </Route>

      {/* Protected Admin Routes */}

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="projects" element={<ProjectList />} />

          <Route path="skills" element={<SkillList />} />

          <Route path="experiences" element={<ExperienceList />} />

          <Route path="educations" element={<EducationList />} />

          <Route path="certificates" element={<CertificateList />} />

          <Route path="social-links" element={<SocialLinks />} />

          <Route path="messages" element={<MessageList />} />

          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
