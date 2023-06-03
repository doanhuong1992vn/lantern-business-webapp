import HttpRequest from '~/utils/HttpRequest';

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

export const update = async (product) => {
    try {
        return await HttpRequest.put("/products", product);
    } catch (error) {
        console.log(error);
    }
}

export const deleteById = async (id) => {
    try {
        await HttpRequest.delete(`/products/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const deleteByIds = (ids) => {
    for (let id of ids) {
        console.log(id)
        deleteById(id).then().catch(err => console.log(err));
    }
}

