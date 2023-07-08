import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth";
import {
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
} from "../../slice/auth";
import { Input, GoogleButton } from "../../ui";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    email: "",
    password: "",
  });

  const [errors, setError] = useState("");

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    setError(""); // Xatolik yuz berdiyida xatolikni tozalash
  };

  const dispatch = useDispatch();

  const { isLoading, loggedIn, error } = useSelector((state) => state.auth);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!post.email || !post.password) {
      setError("Iltimos, maydonlarni to'ldiring");
      return;
    }

    dispatch(loginUserStart());
    try {
      const response = await AuthService.userLogin(post);
      dispatch(loginUserSuccess(response));
      navigate("/profil");
    } catch (error) {
      dispatch(loginUserFailure(error.response.data.detail));
      setError("Kirishda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/profil");
    }
  }, [loggedIn, navigate]);

  const inputs = [
    {
      id: 1,
      inputType: "email",
      name: "email",
      label: "E-mail",
      iconClass: "bi-envelope",
    },
    {
      id: 2,
      inputType: "password",
      name: "password",
      label: "Parol",
      iconClass: "bi-lock",
    },
  ];

  return (
  <div className="w-100 bg-light position-relative py-5 section-vh">
    <div className="container">
      <div className="row d-flex justify-content-center px-3">
        <div className="col-md-5 position-relative bg-white rounded p-4 shadow py-5">
          <form>
            <h5 className="title text-center">Tizimga kirish</h5>
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                value={post[input.name]}
                onChange={onChange}
              />
            ))}
            {errors && <p className="text-danger">{errors}</p>}
            {error && error.includes("not found") && (
              <p className="text-danger">Foydalanuvchi mavjud emas</p>
            )}
            {!loggedIn && (
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  onClick={loginHandler}
                  disabled={isLoading}
                  className="btn btn-primary w-75"
                >
                  {isLoading ? "Loading..." : "Kirish"}
                </button>
              </div>
            )}
            {loggedIn && (
              <div className="d-flex justify-content-center">
                <p className="text-success">Siz tizimga muvaffaqiyatli kirdingiz!</p>
              </div>
            )}
            <div className="d-flex justify-content-center">
              <GoogleButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  );
}

export default Login;
