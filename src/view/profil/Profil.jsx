import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import "./Profil.css";
import axios from '../../services/api';

function Profil() {

    const [post, setPost] = useState([]);

    // const { token } = useSelector(state => state.auth);

    const token = localStorage.getItem("token")
    const decoded = jwt_decode(token);

    console.log(decoded, "decode token");

    useEffect(() => {
        axios.get(`auth/user/${decoded.user_id}`, post)
            .then((res) => {
                setPost(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);



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
                                        <h4>{post.first_name} {post.last_name}</h4>
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
                                    <Link className="btn fs-5 profil-button" to={"/article_add"}>
                                        <i className="bi bi-file-earmark-minus fs-3 me-3" ></i>
                                        Maqolalar
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex align-items-center flex-wrap">
                                    <Link className="btn fs-5 profil-button" to={"/student_wins"}>
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
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Ism Familya</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {post.first_name} {post.last_name}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {post.email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Fakultet</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Matematika Informatika
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Yo'nalish</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Amaliy Matematika
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Kurs va yo'nalish</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        3-kurs 20.08 guruh
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12 d-flex justify-content-end">
                                        <button className="btn btn-info fw-semibold "
                                        >
                                            <i className="bi bi-pencil-square fs-6 me-3"></i>
                                            O'zgartirish
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

export default Profil;