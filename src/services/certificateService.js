import api from "../api/axios";


const certificateService = {
    getCertificates: async () => {
        const response = await api.get(
            "/certificates"
        );
        return response.data;
    },

    createCertificate: async (data) => {
        const response = await api.post(
            "/admin/certificates",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    },


updateCertificate: async (id, data) => {
    data.append(
        "_method",
        "PUT"
    );
    const response = await api.post(
        `/admin/certificates/${id}`,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            }
        }
    );
    return response.data;
},



    deleteCertificate: async (id) => {
        const response = await api.delete(
            `/admin/certificates/${id}`
        );
        return response.data;
    }


};


export default certificateService;