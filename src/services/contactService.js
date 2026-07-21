import api from "../api/axios";

const sendMessage = async (data) => {
    const response = await api.post("/contact", data);
    return response.data;
};

export default {
    sendMessage,
};