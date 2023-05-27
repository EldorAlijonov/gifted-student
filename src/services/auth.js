import axios from "./api";


const AuthService = {
    async userRegister(user) {
        const response = axios.post("/auth",{user});
        return response;
    },
    async userLogin() { },
}
export default AuthService;