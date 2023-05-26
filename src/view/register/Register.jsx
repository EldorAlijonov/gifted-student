import { React, useState } from 'react';
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

    console.log(post);
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
                            {inputs.map((input) => (
                                <Input key={input.id} {...input} value={post[input.name]} onChange={onChange} />
                            ))}
                            <div className="d-flex justify-content-center">
                                <Button buttonStyle={"btn-primary w-75"} buttonName={"Jo'natish"} buttonType={"submit"} />
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