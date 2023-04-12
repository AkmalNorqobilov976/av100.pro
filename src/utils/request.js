import axios from 'axios'
import nProgress from 'nprogress';
const service = axios.create({
    baseURL: `https://api.av100.ru/v3/`
});

service.interceptors.request.use(request => {
    nProgress.start();
    
    request.headers['X-Api-Key'] = '8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9';
    request.headers['X-User-Token'] = localStorage.getItem('token') || '';
    request.headers['X-Device-OS'] = window.navigator.userAgent || '';
    request.headers['Content-Type'] = 'application/json';

    return request;
});


service.interceptors.response.use(response => {
    nProgress.done();
    return response;
}, (error) => {
    nProgress.done();
    return error
});


export default service;