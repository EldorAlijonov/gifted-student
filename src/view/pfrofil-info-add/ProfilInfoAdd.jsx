import React from 'react';
import { Link } from 'react-router-dom';

const ProfilInfoAdd = () => {

    const [post, setPost] = useState({
        id: '',
        faculty: '',
        image: '',
        group: '',
        course: '',
        passport_number: "",
        idcart_number: "",
        passport_or_idcart_file: '',
        status: '',
        region: '',
        district: "",
        street: "",
        resume: '',
        create_at: "",
        base_student: '',
        sub_faculty: ''
    })

    const onChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const persionalSave = (e) => {
        e.preventDefault();

    }


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
                                        <i className="bi bi-file-earmark-person fs-3 me-3"></i>
                                        Shaxsiy malumotlarni kiritish
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex align-items-center flex-wrap">
                                    <Link className="btn fs-5 profil-button" to={"/article_add"}>
                                        <i className="bi bi-file-earmark-minus fs-3 me-3"  ></i>
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
                                <h4 className="title text-center py-2"> Shaxsiy malumotlarni kiritish</h4>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Pasport raqami</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control"
                                            name='passport_number'
                                            value={post.passport_number}
                                            placeholder="AA 1111111"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Viloyat</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control"
                                            name="region"
                                            value={post.region}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Tuman (Shahar)</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text"
                                            name="district"
                                            className="form-control" value={post.district} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Ko'cha</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={post.street}
                                            name="street"
                                        />
                                    </div>
                                </div>
                                <h4 className="title text-center py-2">Ta'lim muosasasi</h4>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Fakultet :</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Fakultet</option>
                                            <option value="1">Matematika Informatika</option>
                                            <option value="2">Fizika texnalogiya</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Yo'nalishi</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected></option>
                                            <option value="1">Matematika </option>
                                            <option value="2">Amaliy matematika</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Kurs</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control"
                                            name="course"
                                            value={post.course} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Guruh</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control"
                                            value={post.group}
                                            name="group"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 text-end">
                                        <button className="btn btn-primary px-5" onClick={persionalSave} type="submit">
                                            Saqlash
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 card bg-white">
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default ProfilInfoAdd;