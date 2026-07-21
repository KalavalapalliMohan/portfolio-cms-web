import api from "../api/axios";

const authService = {
    login: async (credentials) => {
        const response = await api.post("/login", credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/logout");
        return response.data;
    },

    me: async () => {
        const response = await api.get("/me");
        return response.data;
    },
};

export default authService;