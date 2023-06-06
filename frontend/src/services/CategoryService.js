import HttpRequest from '~/utils/HttpRequest';


export const getAll = async (token) => {

    try {
        return await HttpRequest.get('/admin/categories', {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi getAll categories :" + error);
    }
};

export const save = async (category, token) => {
    try {
        return await HttpRequest.post("/admin/categories", category, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi save category :" + error);
    }
}
