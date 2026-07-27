import api from "../api/axios";

const socialLinkService = {

    getSocialLinks: async () => {
        const response = await api.get("/admin/social-links");
        return response.data;
    },

    createSocialLink: async (data) => {
        const response = await api.post("/admin/social-links", data);
        return response.data;
    },

    updateSocialLink: async (id, data) => {
        const response = await api.put(`/admin/social-links/${id}`, data);
        return response.data;
    },

    deleteSocialLink: async (id) => {
        const response = await api.delete(`/admin/social-links/${id}`);
        return response.data;
    }

};

export default socialLinkService;