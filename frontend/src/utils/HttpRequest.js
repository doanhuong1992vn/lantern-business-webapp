import axios from 'axios';

const HttpRequest = axios.create({
    baseURL: 'http://localhost:8080/api/',
});
console.log('HttpRequest created from axios!')
export default HttpRequest;