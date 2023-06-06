import HttpRequest from '~/utils/HttpRequest';

export const register = async (registerRequest) => {
    try {
        return await HttpRequest.post('/register', registerRequest)
    } catch (error) {
        console.log("Axios lỗi register user :" + error);
    }
}

