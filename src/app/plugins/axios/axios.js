import axios from "axios";

axios.interceptors.request.use((config) => {
    const protocol = process.env.PROTOCOL;
    const domain = process.env.DOMAIN;
    config.baseURL = protocol + domain;

    return config;
});

export default axios;