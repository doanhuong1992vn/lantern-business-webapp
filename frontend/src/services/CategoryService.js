import HttpRequest from '~/utils/HttpRequest';

export const getAll = async () => {
    try {
        console.log('Get all categories')
        return await HttpRequest.get('/admin/categories');
    } catch (error) {
        console.log(error);
    }
};

export const save = async (category) => {
    try {
        return await HttpRequest.post("/admin/categories", category);
    } catch (error) {
        console.log(error);
    }
}
