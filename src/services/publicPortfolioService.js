import api from "../api/axios";

const publicPortfolioService = {
    getPortfolio: async () => {
        const response = await api.get("/portfolio");
        return response.data;
    },
};

export default publicPortfolioService;