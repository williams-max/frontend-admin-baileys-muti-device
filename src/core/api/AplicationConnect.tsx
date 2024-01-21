import axios from "axios";

import ConfigSwisse from "./ConfigSwisse";



const AplicationConnect = axios.create({
    baseURL: `${ConfigSwisse.urlapi}`,  // lo correcto

});

AplicationConnect.interceptors.request.use(async (config: any) => {
    const token = await localStorage.getItem('token');
    if (!config) {
        config = {};
    }
    if (!config.headers) {
        config.headers = {};
    }
    if (token) {

        config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
});

export default AplicationConnect;
