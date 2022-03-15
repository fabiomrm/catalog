import axios from 'axios';
import qs from 'qs';
export const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'https://fmrm-catalog.herokuapp.com';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'myclientid';
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'myclientsecret';

const basicHeader = () => 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);

type LoginData = {
    username: string;
    password: string;
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
