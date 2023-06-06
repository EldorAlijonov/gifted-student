import axios from "./api";

const AuthService = {
    async userRegister(user) {
        const response = await axios.post("auth/register/", user);
        return response.data;
    },
    async userLogin(user) {
        // console.log(user);
        const response = await axios.post("auth/login/", user);
        return response.data
    },
}
export default AuthService;