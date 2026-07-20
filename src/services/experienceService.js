import api from "../api/axios";

const experienceService = {

    getExperiences: async () => {
        const response = await api.get("/admin/experiences");
        return response.data;
    },

    createExperience: async (data) => {
        const response = await api.post("/admin/experiences", data);
        return response.data;
    },

    updateExperience: async (id, data) => {
        const response = await api.put(`/admin/experiences/${id}`, data);
        return response.data;
    },

    deleteExperience: async (id) => {
        const response = await api.delete(`/admin/experiences/${id}`);
        return response.data;
    }

};

export default experienceService;