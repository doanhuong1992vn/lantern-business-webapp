import httpRequest from '~/utils/httpRequest';


export const getAll = async (token) => {

    try {
        return await httpRequest.get('/sizes', {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi getAll Sizes :" + error);
    }
};

export const save = async (size, token) => {
    try {
        return await httpRequest.post("/admin/sizes", size, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi save Size :" + error);
    }
}
