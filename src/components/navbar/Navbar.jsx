import { Link } from "react-router-dom";
import "./navbar.scss";
const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-ligth py-2">
            <div className="container-fluid px-5">
                <Link className="navbar-brand" to={"/"}>FDU</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-5 gap-0">
                        <li className="nav-item">
                            <Link className="btn register-btn" to="/register">Ro'yxatdan O'tish</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn border login-btn" to="/login">Kirish</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;