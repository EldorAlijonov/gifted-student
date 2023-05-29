import axios from "./api";


const AuthService = {
    async userRegister(user) {
        const response = await axios.post("/auth/register/", user);
        return response.data;
    },
    async userLogin() { },
}
export default AuthService;