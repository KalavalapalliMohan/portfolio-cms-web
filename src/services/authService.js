import api from "../api/axios";

const authService = {
  logout: async () => {
    return await api.post("/admin/logout");
  },
};

export default authService;