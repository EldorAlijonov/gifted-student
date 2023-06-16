import React from 'react';
import { Link } from 'react-router-dom';

function StudentWins() {
    return (
        <div className="container profil-div">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"
                                        className="rounded-circle border" width="150" />
                                    <div className="mt-3">
                                        <h4>Eldor Alijonov</h4>
                                        <marquee width="200" direction="left" scrollamount="1"
                                            className="text-secondary mb-1">
                                            Amaliy Matematika 3-kurs 20.08 guruh talabasi
                                        </marquee>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex align-items-center flex-wrap">
                                    <Link className="btn fs-5 profil-button" to={"/profil"}>
                                        <i className="bi bi-person-square fs-3 me-3"></i>
                                        Profil
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex align-items-center flex-wrap">
                                    <Link className="btn fs-5 profil-button" to={"/profil_info_add"}>
                                        <i className="bi  bi-file-earmark-person fs-3 me-3"></i>
                                        Shaxsiy malumotlarni kiritish
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex align-items-center flex-wrap">
                                    <Link className="btn fs-5 profil-button" to={"/article_add"} >
                                        <i className="bi bi-file-earmark-minus fs-3 me-3"></i>
                                        Maqolalar
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex align-items-center flex-wrap">
                                    <Link className="btn fs-5 profil-button">
                                        <i className="bi bi-trophy fs-3 me-3"></i>
                                        Talaba yutuqlari
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link className="btn fs-5 profil-button d-flex align-items-center flex-wrap">
                                        <i className="bi bi-wallet fs-3 me-3"></i>
                                        Grant
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3 card bg-white">
                            <div className="card-body">
                                <h4 className="title text-center py-2">Talabaning yutuqlari</h4>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Nomi</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value="" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">pdf yoki wort ma'lumot</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="file" className="form-control" value="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 text-end">
                                        <button className="btn btn-primary px-5">
                                            Saqlash
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default StudentWins;