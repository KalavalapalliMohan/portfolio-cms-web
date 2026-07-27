import api from "../api/axios";

const publicSocialLinkService = {

    getSocialLinks: async () => {
        const response = await api.get("/social-links");
        return response.data;
    }

};

export default publicSocialLinkService;