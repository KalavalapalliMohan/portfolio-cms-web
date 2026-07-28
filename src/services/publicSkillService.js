import api from "../api/axios";

const publicSkillService = {

    getSkills: async () => {
        const response = await api.get("/skills");
        return response.data;
    }

};

export default publicSkillService;