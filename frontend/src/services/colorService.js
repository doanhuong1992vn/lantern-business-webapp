import httpRequest from '~/utils/httpRequest';


export const getAll = async (token) => {

    try {
        return await httpRequest.get('/admin/colors', {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi getAll Colors :" + error);
    }
};

export const save = async (color, token) => {
    try {
        return await httpRequest.post("/admin/colors", color, {
            "headers" : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Axios lỗi save Color :" + error);
    }
}
