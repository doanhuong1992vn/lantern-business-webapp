import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8080/api/',
});
console.log('httpRequest created from axios!')
export default httpRequest;