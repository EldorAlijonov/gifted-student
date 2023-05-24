import React from 'react';

import "./Register.css";
function Register() {
    return (
        <div className="w-100 bg-primary position-relative py-5 section-vh">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 position-relative bg-white rounded p-4">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Ism</label>
                                <div className="form-input-div d-flex align-items-center ps-3 py-2 rounded text-secondary">
                                    <i className="bi bi-file-earmark-person "></i>
                                    <input type="text" className="form-control-style w-100" placeholder="Ism" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Familya</label>
                                <div className="form-input-div d-flex align-items-center ps-3 py-2 rounded text-secondary">
                                    <i className="bi bi-file-earmark-person "></i>
                                    <input type="text" className="form-control-style w-100" placeholder="Familya" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">E-mail</label>
                                <div className="form-input-div text-secondary d-flex align-items-center ps-3 py-2 rounded">
                                    <i className="bi bi-envelope "></i>
                                    <input type="email" className="form-control-style w-100" placeholder="E-mail" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Parol</label>
                                <div className="form-input-div d-flex align-items-center  ps-3 py-2 rounded text-cecondary">
                                    <i className="bi bi-lock "></i>
                                    <input type="password" className="form-control-style w-100" placeholder="********" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary w-75">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;