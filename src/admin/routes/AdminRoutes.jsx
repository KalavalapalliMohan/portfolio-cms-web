import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import AdminLayout from "../layouts/AdminLayout";

import ProjectList from "../pages/projects/ProjectList";


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


      </Route>


    </Routes>

  );

}


export default AdminRoutes;