import httpRequest from '~/utils/httpRequest';

export const getAll = async (token) => {
    try {
        return await httpRequest.get('/products', {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi productService getAll :" + error);
    }
};

export const findById = async (id, token) => {
    try {
        return await httpRequest.get(`/products/${id}`, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi productService findById  :" + error);
    }
};

export const save = async (product, token) => {
    try {
        return await httpRequest.post("/auth/products", product, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi productService save :" + error);
    }
}

export const update = async (product, token) => {
    try {
        return await httpRequest.put("/auth/products", product, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi productService update :" + error);
    }
}

export const deleteById = async (id, token) => {
    try {
        await httpRequest.delete(`/auth/products/${id}`, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi productService delete:" + error);
    }
}

export const deleteByIds = (ids, token) => {
    for (let id of ids) {
        deleteById(id, token).then().catch(err => console.log(err));
    }
}

