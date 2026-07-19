import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";


const useDashboard = () => {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        fetchDashboard();

    }, []);


    const fetchDashboard = async () => {

        try {

            const res = await getDashboard();

            setDashboard(res.data);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message || "Dashboard loading failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return {
        dashboard,
        loading,
        error
    };

};


export default useDashboard;