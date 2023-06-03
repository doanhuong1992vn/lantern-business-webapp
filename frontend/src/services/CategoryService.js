import HttpRequest from '~/utils/HttpRequest';

export const getAll = async () => {
    try {
        console.log('HttpRequest call get()')
        return await HttpRequest.get('/categories');
    } catch (error) {
        console.log(error);
    }
};

export const save = async (category) => {
    try {
        return await HttpRequest.post("/categories", category);
    } catch (error) {
        console.log(error);
    }
}
