import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import jwtDecode from 'jwt-decode';

export const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'https://fmrm-catalog.herokuapp.com';

const TOKEN_KEY = 'authData';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'myclientid';
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'myclientsecret';

const basicHeader = () => 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);



type LoginData = {
    username: string;
    password: string;
}

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type TokenData = {
    exp: number;
    user_name: string;
    authorities: Role[];
}



export const requestBackendLogin = (loginData: LoginData) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: basicHeader(),
    }
    const data = qs.stringify({
        ...loginData,
        grant_type: 'password'
    })

    return axios({
        method: 'POST',
        baseURL: BASE_URL,
        url: '/oauth/token',
        headers,
        data,
    });
}

export const requestBackend = (config: AxiosRequestConfig) => {

    const headers = config.withCredentials ? {
        ...config.headers,
        Authorization: "Bearer " + getAuthData().access_token
    } : { ...config.headers };
    return axios({ ...config, baseURL: BASE_URL, headers });
}



export const saveAuthData = (obj: LoginResponse) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(obj));
}

export const getAuthData = (): LoginResponse => {
    const str = localStorage.getItem(TOKEN_KEY) ?? "{}";

    return JSON.parse(str);
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    console.log("interceptor antes da requisição")
    return config;
}, function (error) {
    console.log("erro na requisição")
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    console.log("interceptor resposta com sucesso")
    return response;
}, function (error) {

    if (error.response.status === 401 || error.response.status === 403) {
        window.location.href = "/admin/auth";
        console.log("resposta com erro")
    }
    return Promise.reject(error);
});

export const getTokenData = (): TokenData | undefined => {
    try {
        return jwtDecode(getAuthData().access_token) as TokenData;
    } catch(e) {
        return undefined;
    }
};

export const isAuthenticated = () : boolean => {
    const tokenData = getTokenData();

    return (tokenData && tokenData.exp * 1000 > Date.now()) ? true : false;
}