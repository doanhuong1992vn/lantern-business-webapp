import HttpRequest from '~/utils/HttpRequest';

export const register = async (registerRequest) => {
    try {
        return await HttpRequest.post('/register', registerRequest);
    } catch (error) {
        console.log(error);
    }
}


export const login = async (loginRequest) => {
    try {
        return await HttpRequest.post('/login', loginRequest);
    } catch (error) {
        console.log(error);
    }
};

