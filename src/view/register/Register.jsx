import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationError } from '../../components';
import AuthService from '../../services/auth';
import { registerUserFailure, registerUserStart, registerUserSuccess } from '../../slice/auth';
import { Input, Button, GoogleButton } from '../../ui';

import "./Register.css";
function Register() {


    const [post, setPost] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: ""
    });


    const onChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);


    const registerHandler = async (e) => {
        e.preventDefault();
        dispatch(registerUserStart());
        try {
            const response = await AuthService.userRegister(post);
            dispatch(registerUserSuccess(response.post));
        } catch (error) {
            dispatch(registerUserFailure(error.response));

        }

    }

    const inputs = [
        {
            id: 1,
            inputType: "text",
            name: "first_name",
            label: "Ism",
            iconClass: "bi-file-earmark-person"
        },
        {
            id: 2,
            inputType: "text",
            name: "last_name",
            label: "Familya",
            iconClass: "bi-file-earmark-person"
        },
        {
            id: 3,
            inputType: "email",
            name: "email",
            label: "E-mail",
            iconClass: "bi-envelope"
        },
        {
            id: 4,
            inputType: "password",
            name: "password",
            label: "Parol",
            iconClass: "bi-lock"
        },
        {
            id: 5,
            inputType: "password",
            name: "password2",
            label: "Parolni tasdiqlang",
            iconClass: "bi-lock"
        }

    ];


    return (
        <div className="w-100 bg-light position-relative py-5 section-vh">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 position-relative bg-white rounded p-4 shadow py-5">
                        <form>
                            <h5 className="title text-center">Ro'yxatdan o'tish</h5>
                            {/* <ValidationError /> */}
                            {inputs.map((input) => (
                                <Input key={input.id} {...input} value={post[input.name]} onChange={onChange} />
                            ))}
                            <div className="d-flex justify-content-center">
                                <button
                                    type={"submit"}
                                    onClick={registerHandler}
                                    disabled={isLoading}
                                    className={`btn btn-primary w-75`}
                                >
                                    {isLoading ? "Loading..." : "Jo'natish"}
                                </button>
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

export default Register;