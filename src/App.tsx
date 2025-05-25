/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./App.css";
import { AuthRoute, PrivateRoute } from "./routes";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

function App() {
    const [profile, setProfile] = useState<any>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const getOrg = async () => {
        try {
            const response = await axios.get('https://devapi.myspa.vn/v1/organizations/demo1');
            setProfile(response.data?.context);
            if (location.pathname === '/register') {
                navigate('/', { replace: true })
            }
        } catch (error) {
            console.error(error);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getOrg()
    }, [])
    if (loading) return <div>Loading....</div>
    return profile ? <PrivateRoute /> : <AuthRoute />
}

export default App;
