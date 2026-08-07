import api from "../api/axios";

const publicProjectService = {

    // Get All Projects
    getProjects: async () => {
        const response = await api.get("/projects");
        return response.data;
    },

};

export default publicProjectService;