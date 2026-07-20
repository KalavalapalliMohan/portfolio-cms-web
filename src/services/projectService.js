import api from "../api/axios";

const projectService = {

    // Get All Projects
    getProjects: async () => {
        const response = await api.get("/projects");
        return response.data;
    },

    // Create Project
    createProject: async (data) => {
        const response = await api.post("/admin/projects", data);
        return response.data;
    },

    // Update Project
    updateProject: async (id, data) => {
        const response = await api.put(`/admin/projects/${id}`, data);
        return response.data;
    },

    // Delete Project
    deleteProject: async (id) => {
        const response = await api.delete(`/admin/projects/${id}`);
        return response.data;
    },

    // Upload Image
    uploadImage: async (formData) => {
        const response = await api.post(
            "/admin/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

};

export default projectService;