import api from "../api/axios";

const skillService = {

    getSkills: async () => {
        const response = await api.get("/admin/skills");
        return response.data;
    },

    createSkill: async (data) => {
        const response = await api.post("/admin/skills", data);
        return response.data;
    },

    updateSkill: async (id, data) => {
        const response = await api.put(`/admin/skills/${id}`, data);
        return response.data;
    },

    deleteSkill: async (id) => {
        const response = await api.delete(`/admin/skills/${id}`);
        return response.data;
    }

};

export default skillService;