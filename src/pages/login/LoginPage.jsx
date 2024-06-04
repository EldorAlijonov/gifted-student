import { LoginForm, Navbar, } from "../../components";
import "./loginpage.scss";

const LoginPage = () => {
    return (

        <div className="login-page">
            <Navbar />
            <div className="login-page-container">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;