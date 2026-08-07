import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import settingService from "./services/settingService";
import publicProjectService from "./services/publicProjectService";
import publicSkillService from "./services/publicSkillService";
import publicExperienceService from "./services/publicExperienceService";
import publicEducationService from "./services/publicEducationService";
import publicCertificateService from "./services/publicCertificateService";
import publicSocialLinkService from "./services/publicSocialLinkService";

import Loader from "./components/Loader";

import AdminLayout from "./admin/layouts/AdminLayout";
import AdminAuthLayout from "./admin/layouts/AdminAuthLayout";
import ProtectedRoute from "./admin/layouts/ProtectedRoute";
import GuestRoute from "./admin/layouts/GuestRoute";

// ===============================
// Common Components
// ===============================

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));

// ===============================
// Public Components
// ===============================

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Resume = lazy(() => import("./components/Resume"));
const Certificates = lazy(() => import("./components/Certificates"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Services = lazy(() => import("./components/Services"));
const Contact = lazy(() => import("./components/Contact"));

// ===============================
// Admin Pages
// ===============================

const Login = lazy(() => import("./admin/pages/Login"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const ProjectList = lazy(() => import("./admin/pages/projects/ProjectList"));
const SkillList = lazy(() => import("./admin/pages/skills/SkillList"));
const ExperienceList = lazy(
  () => import("./admin/pages/experiences/ExperienceList"),
);
const EducationList = lazy(
  () => import("./admin/pages/education/EducationList"),
);
const CertificateList = lazy(
  () => import("./admin/pages/certificates/CertificateList"),
);
const Settings = lazy(() => import("./admin/pages/settings/Settings"));
const MessageList = lazy(() => import("./admin/pages/messages/MessageList"));
const SocialLinks = lazy(
  () => import("./admin/pages/social-links/SocialLinks"),
);

function PortfolioWebsite() {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
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
          educationsResponse,
          certificatesResponse,
          socialLinksResponse,
        ] = await Promise.all([
          settingService.getSettings(),
          publicSkillService.getSkills(),
          publicProjectService.getProjects(),
          publicExperienceService.getExperiences(),
          publicEducationService.getEducations(),
          publicCertificateService.getCertificates(),
          publicSocialLinkService.getSocialLinks(),
        ]);

        setSettings(settingsResponse.data);

        setSkills(skillsResponse.data || []);

        setProjects(projectsResponse.data || []);

        setExperiences(experiencesResponse.data || []);

        setEducations(educationsResponse.data || []);

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
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>
          {settings?.full_name
            ? `${settings.full_name} | Laravel Full Stack Developer`
            : "Mohan Kalavalapalli | Laravel Full Stack Developer"}
        </title>

        <meta
          name="description"
          content="PHP Laravel Full Stack Developer with 3+ years of experience in Laravel, React, REST APIs, PostgreSQL, MySQL, CRM, HRMS and enterprise applications."
        />

        <meta
          property="og:title"
          content={
            settings?.full_name
              ? `${settings.full_name} | Laravel Full Stack Developer`
              : "Mohan Kalavalapalli | Laravel Full Stack Developer"
          }
        />

        <meta
          property="og:image"
          content={
            settings?.profile_image_url ||
            "https://portfolio-cms-web-five.vercel.app/assets/img/mohan.webp"
          }
        />
      </Helmet>

      <Header settings={settings} socialLinks={socialLinks} />

      <main>
        <Hero settings={settings} />

        <About settings={settings} />

        <Skills skills={skills} />

        <Resume experiences={experiences} educations={educations} />

        <Certificates certificates={certificates} />

        <Portfolio projects={projects} />

        <Services />

        <Contact settings={settings} />
      </main>

      <Footer settings={settings} />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<PortfolioWebsite />} />

        <Route element={<GuestRoute />}>
          <Route element={<AdminAuthLayout />}>
            <Route path="/admin/login" element={<Login />} />
          </Route>
        </Route>

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
    </Suspense>
  );
}

export default App;
