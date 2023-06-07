import httpRequest from '~/utils/httpRequest';

export const getAll = async (token) => {
    try {
        return await httpRequest.get('/admin/products', {
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
        console.log('httpRequest call save product: ' + httpRequest)
        return await httpRequest.post("/admin/products", product, {
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
        return await httpRequest.put("/admin/products", product, {
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
        await httpRequest.delete(`/admin/products/${id}`, {
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

