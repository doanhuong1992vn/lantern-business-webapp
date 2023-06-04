import HttpRequest from '~/utils/HttpRequest';

export const getAll = async () => {
    try {
        console.log('HttpRequest call get all products')
        return await HttpRequest.get('/products');
    } catch (error) {
        console.log(error);
    }
};

export const save = async (product) => {
    try {
        console.log('HttpRequest call save product')
        return await HttpRequest.post("/products", product);
    } catch (error) {
        console.log(error);
    }
}

export const update = async (product) => {
    try {
        console.log('HttpRequest call update product')
        return await HttpRequest.put("/products", product);
    } catch (error) {
        console.log(error);
    }
}

export const deleteById = async (id) => {
    try {
        console.log('HttpRequest call delete 1 product')
        await HttpRequest.delete(`/products/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const deleteByIds = (ids) => {
    console.log('HttpRequest call delete product list')
    for (let id of ids) {
        deleteById(id).then().catch(err => console.log(err));
    }
}

