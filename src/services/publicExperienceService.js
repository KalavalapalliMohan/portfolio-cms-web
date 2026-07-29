import api from "../api/axios";

const publicExperienceService = {

    getExperiences: async () => {

        const response = await api.get("/experiences");

        return response.data;

    }

};

export default publicExperienceService;