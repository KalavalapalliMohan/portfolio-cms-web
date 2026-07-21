import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import AdminLayout from "../layouts/AdminLayout";

import ProjectList from "../pages/projects/ProjectList";
import SkillList from "../pages/skills/SkillList";
import ExperienceList from "../pages/experiences/ExperienceList";
import EducationList from "../pages/education/EducationList";
import CertificateList from "../pages/certificates/CertificateList";
import MessageList from "../pages/messages/MessageList";

import Settings from "../pages/settings/Settings";

function AdminRoutes() {

  return (

    <Routes>


      <Route 
        path="/login" 
        element={<Login />} 
      />


      <Route 
        path="/"
        element={<AdminLayout />}
      >


        <Route
          path="dashboard"
          element={<Dashboard />}
        />


        <Route
          path="projects"
          element={<ProjectList />}
        />

        <Route
          path="skills"
          element={<SkillList />}
        />

        <Route
          path="experiences"
          element={<ExperienceList />}
        />

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

        <Route
          path="messages"
          element={<MessageList />}
        />


      </Route>


    </Routes>

  );

}


export default AdminRoutes;