import api from "../api/axios";

const publicEducationService = {

    getEducations: async () => {

        const response = await api.get("/educations");

        return response.data;

    }

};

export default publicEducationService;