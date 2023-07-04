import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "../../services/api";

function Menu() {
  const [student, setStudent] = useState({});

  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  useEffect(() => {
    axios
      .get(`auth/user/${decoded.user_id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="Admin"
              className="rounded-circle border"
              width="150"
            />
            <div className="mt-3">
              <h4>
                {student.first_name} {student.last_name}
              </h4>
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
              Shaxsiy malumotlar
            </Link>
          </li>
          <li className="list-group-item d-flex align-items-center flex-wrap">
            <Link
              className={`btn fs-5 profil-button w-100 text-start ${
                studentId ? "" : "disabled"
              }`}
              to={"/article_add"}
              disabled={!studentId}
            >
              <i className="bi bi-file-earmark-minus fs-3 me-3"></i>
              Maqolalar
              {studentId ? null : (
                <p className="text-danger fs-6 ">
                  Shaxsiy malumotlarni kiriting
                </p>
              )}
            </Link>
          </li>
          <li className="list-group-item d-flex align-items-center flex-wrap">
            <Link
              className={`btn fs-5 profil-button w-100 text-start ${
                studentId ? "" : "disabled"
              }`}
              disabled={!studentId}
              to={"/student_wins"}
            >
              <i className="bi bi-trophy fs-3 me-3"></i>
              Talaba yutuqlari
              {studentId ? null : (
                <p className="text-danger fs-6 ">
                  Shaxsiy malumotlarni kiriting
                </p>
              )}
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
  );
}

export default Menu;
