import axios from 'axios';

const FreeImageUploadRequest = axios.create({
    baseURL: 'https://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5',
});
console.log('FreeImageUploadRequest created from axios!')
export default FreeImageUploadRequest;