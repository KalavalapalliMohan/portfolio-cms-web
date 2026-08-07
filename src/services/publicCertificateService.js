import api from "../api/axios";


const publicCertificateService = {
    getCertificates: async () => {
        const response = await api.get(
            "/certificates"
        );
        return response.data;
    },
};


export default publicCertificateService;