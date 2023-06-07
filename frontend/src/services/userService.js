import httpRequest from '~/utils/httpRequest';

export const register = async (registerRequest) => {
    try {
        return await httpRequest.post('/register', registerRequest)
    } catch (error) {
        console.log("Axios lỗi register user :" + error);
    }
}

export const isExistsByData = async (field, username) => {
    try {
        return await httpRequest.get(`/checking/user/${field}/${username}`)
    } catch (error) {
        console.log("Axios lỗi register user :" + error);
    }
}

