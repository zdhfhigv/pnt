// ***** use for set token in headers request to api ******
//                     ************
import axios from 'axios';
const baseURL = "https://backend.nanotf.ir/";
axios.defaults.baseURL = 'https://backend.nanotf.ir/';

const Bearertoken = localStorage.getItem("token");

// add auth header with jwt if account is logged in and request is to the api url
// const isApiUrl = request.url.startsWith(baseURL);

const Axios = axios.create({
    baseURL,
    // timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

Axios.interceptors.request.use(async (config) => {
    const token = await localStorage.getItem('token');
    const isLoggedIn = token ? true : false;
    config.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // add auth header with jwt if account is logged in and request is to the api url
        ...(isLoggedIn && {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
    }
    return config
}, error => Promise.reject(error))

Axios.interceptors.response.use(undefined, (response) => {

    // if token expired
    if (response.response.status === 401) {
        alert("توکن شما منقضی شده، نیاز است تا مجددا وارد شوید!")
        localStorage.clear();
        window.location.href = '/auth/login';
    }

    return Promise.reject(response);
})

export default Axios;