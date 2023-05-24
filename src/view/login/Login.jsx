import React from 'react';
import "./Login.css";
function Login() {
    return (
        <div className="w-100 bg-light position-relative py-5 section-vh">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 position-relative bg-white rounded p-4 shadow py-5">
                        <form>
                            <h5 className="title text-center">Tizimga kirish</h5>
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
                            <div className="d-flex justify-content-center ">
                                <a className="w-75 d-flex justify-content-center form-gogle mt-4 rounded border px-4 py-2 text-secondary">
                                    <i class="bi bi-google me-2">
                                    </i><span>Google yordamida ro'yhatdan o'tish</span>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;