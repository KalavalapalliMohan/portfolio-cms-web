import api from "../api/axios";


const settingService = {
    getSettings: async()=>{
        const response = await api.get(
            "/settings"
        );
        return response.data;
    },

    updateSettings: async(id,data)=>{
        const response = await api.post(
            `/admin/settings/${id}`,
            data,
            {
                headers:{
                    "Content-Type":
                    "multipart/form-data"
                }
            }
        );
        return response.data;
    }

};


export default settingService;