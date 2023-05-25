import React from 'react';
import { Input, Button, GoogleButton } from '../../ui';

import "./Register.css";
function Register() {
    return (
        <div className="w-100 bg-light position-relative py-5 section-vh">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 position-relative bg-white rounded p-4 shadow py-5">
                        <form>
                            <h5 className="title text-center">Ro'yxatdan o'tish</h5>
                            <Input iconClass={"bi-file-earmark-person"} inputType={"text"} label={"Ism"} />
                            <Input iconClass={"bi-file-earmark-person"} inputType={"text"} label={"Familya"} />
                            <Input iconClass={"bi-envelope"} inputType={"email"} label={"E-mail"} />
                            <Input iconClass={"bi-lock"} inputType={"password"} label={"Parol"} />
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