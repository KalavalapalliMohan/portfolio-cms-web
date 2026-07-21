import api from "../api/axios";

const getMessages = async (page = 1) => {
    const response = await api.get(`/admin/messages?page=${page}`);
    return response.data;
};

const getMessage = async (id) => {
    const response = await api.get(`/admin/messages/${id}`);
    return response.data;
};

const deleteMessage = async (id) => {
    const response = await api.delete(`/admin/messages/${id}`);
    return response.data;
};

const getUnreadMessages = async () => {
    const response = await api.get("/admin/messages/unread");
    return response.data;
};

export default {
    getMessages,
    getMessage,
    deleteMessage,
    getUnreadMessages,
};