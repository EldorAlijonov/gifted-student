import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../../helpers/storage";
import { logoutUser, logoutUserSuccess } from "../../slice/auth";
import "./Navbar.css";
function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, token } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
    try {
      dispatch(logoutUserSuccess());
      removeItem("token");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log("Error");
    }
  };

  const access = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 sticky-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            Gifted Student
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {token ? null : (
              <>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/"}
                    >
                      Main
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Features
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                  </li>
                </ul>
              </>
            )}

            <div className="ms-auto d-flex align-items-center">
              {token ? (
                <>
                  <p className="text-dark">{}</p>
                  <button
                    className="btn me-3 btn-outline-danger px-4 fw-bold"
                    onClick={logoutHandler}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Logout"}
                  </button>
                </>
              ) : null}
              {token ? null : (
                <>
                  <button
                    className="btn btn-primary me-4 px-4"
                    onClick={() => access()}
                  >
                    Kirish
                  </button>
                </>
              )}
              <div className="d-flaex navbar-select-div py-1 px-2 rounded text-secondary">
                <i className="bi bi-globe"></i>
                <select className="px-2 navbar-select text-secondary">
                  <option value="1">Uz</option>
                  <option value="1">Ru</option>
                  <option value="1">En</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
