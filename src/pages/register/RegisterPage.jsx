import { Navbar, RegisterForm } from "../../components";
import "./registerpage.scss";

const RegisterPage = () => {
    return (

        <div className="register-page">
            <Navbar />
            <div className="register-page-container">
                <RegisterForm />
            </div>
        </div>
    );
}

export default RegisterPage;