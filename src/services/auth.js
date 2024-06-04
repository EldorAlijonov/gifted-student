import axios from "./api";

export const RegisterService = {
    async userRegister(user) {
        const response = await axios.post("auth/register/", user);
        return response.data;
    },

};
export const LoginService = {
    async userLogin(user) {
        const response = await axios.post("auth/login/", user);
        return response.data;
    },

};