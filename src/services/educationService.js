import api from "../api/axios";

const educationService = {

    getEducations: async () => {
        const response = await api.get("/admin/educations");
        return response.data;
    },

    createEducation: async (data) => {
        const response = await api.post("/admin/educations", data);
        return response.data;
    },

    updateEducation: async (id, data) => {
        const response = await api.put(`/admin/educations/${id}`, data);
        return response.data;
    },

    deleteEducation: async (id) => {
        const response = await api.delete(`/admin/educations/${id}`);
        return response.data;
    }

};

export default educationService;