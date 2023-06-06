import HttpRequest from '~/utils/HttpRequest';

export const getAll = async (token) => {
    try {
        return await HttpRequest.get('/admin/products', {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi getAll products :" + error);
    }
};

export const save = async (product, token) => {
    try {
        console.log('HttpRequest call save product: ' + HttpRequest)
        return await HttpRequest.post("/admin/products", product, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi save product :" + error);
    }
}

export const update = async (product, token) => {
    try {
        return await HttpRequest.put("/admin/products", product, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi update product :" + error);
    }
}

export const deleteById = async (id, token) => {
    try {
        await HttpRequest.delete(`/admin/products/${id}`, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi delete product:" + error);
    }
}

export const deleteByIds = (ids, token) => {
    for (let id of ids) {
        deleteById(id, token).then().catch(err => console.log(err));
    }
}

