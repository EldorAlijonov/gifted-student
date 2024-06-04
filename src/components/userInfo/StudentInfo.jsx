import { useEffect, useState } from "react";
import { StudentsRepository } from "../../services/students";
import { jwtDecode } from "jwt-decode";

const StudentInfo = () => {
    const [info, setInfo] = useState([]);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const getStudentInfo = async () => {
        try {
            const response = await StudentsRepository.getStudents(decoded.user_id);
            setInfo(response);
        } catch (err) {

        }
    }

    console.log(info);

    useEffect(() => {
        getStudentInfo();
    }, [decoded.user_id]);

    return (

        <div className="card p-3 shadow-sm">
            <div className="d-column d-lg-flex gap-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Ism Familya :</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{ }</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email :</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{ }</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Yashash manzili :</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{`${info.region} ${info.district} ${info.street}`}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Pasport yoki Id raqami:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{ }</div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Fakultet :</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{ } </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Yo'nalish :</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{ }</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Kurs va Guruh:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{ }</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Tel raqami</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{ }</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentInfo;