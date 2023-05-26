import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserStart } from '../../slice/auth';
import { Input, Button, GoogleButton } from '../../ui';
import "./Login.css";
function Login() {


    const [post, setPost] = useState({
        email: "",
        password: "",
    })


    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);


    const onChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }



    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUserStart());
    }

    const inputs = [
        {
            id: 1,
            inputType: "email",
            name: "email",
            label: "E-mail",
            iconClass: "bi-envelope"
        },
        {
            id: 2,
            inputType: "password",
            name: "password",
            label: "Parol",
            iconClass: "bi-lock"
        }
    ];

    return (
        <div className="w-100 bg-light position-relative py-5 section-vh">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 position-relative bg-white rounded p-4 shadow py-5">
                        <form>
                            <h5 className="title text-center">Tizimga kirish</h5>
                            {inputs.map((input) => (
                                <Input key={input.id} {...input} value={post[input.name]} onChange={onChange} />
                            ))}
                            <div className="d-flex justify-content-center">
                                <Button
                                    buttonStyle={"btn-primary w-75"}
                                    buttonName={isLoading?"Loading..":"Kirish"}
                                    buttonType={"submit"}
                                    onClick={loginHandler}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="d-flex justify-content-center ">
                                <GoogleButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;