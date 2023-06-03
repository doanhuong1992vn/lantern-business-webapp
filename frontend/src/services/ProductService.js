import HttpRequest from '~/utils/HttpRequest';
import FreeImageUploadRequest from '~/utils/FreeImageUploadRequest';

export const getAll = async () => {
    try {
        console.log('HttpRequest call get()')
        return await HttpRequest.get('/products');
    } catch (error) {
        console.log(error);
    }
};

export const save = async (product) => {
    try {
        return await HttpRequest.post("/products", product);
    } catch (error) {
        console.log(error);
    }
}

export const uploadImage = async (formData) => {
    try {
        return await FreeImageUploadRequest.post('', {
                body: formData,
            });
    } catch (error) {
        console.log(error);
    }
}

