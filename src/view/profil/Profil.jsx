import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "../../services/api";
import { StudentsRepository } from "../../services/students";
import "./Profil.css";

function Profil() {
  const [post, setPost] = useState([]);
  const [student, setStudent] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  useEffect(() => {
    const getStudentInfo = async (userId) => {
      try {
        const response = await StudentsRepository.getStudents(userId);
        setStudent(response.data);
        localStorage.setItem("studentId", response.data.id);
      } catch (error) {
        console.log(error);
      }
    };

    axios
      .get(`auth/user/${decoded.user_id}`, post)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getStudentInfo(decoded.user_id);
  }, []);

  return (
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
          <div className="col-sm-9 text-secondary">{post.email}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Fakultet</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {student.faculty ? student.faculty : "Ma'lumot kiritilmagan"}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Yo'nalish</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {student.sub_faculty
              ? student.sub_faculty
              : "Ma'lumot kiritilmagan"}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Kurs va Guruh</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {student.course ? student.course : "Ma'lumot kiritilmagan"}{" "}
            {student.group}
          </div>
        </div>
        <hr />
        {/* <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            <button className="btn btn-info fw-semibold ">
              <i className="bi bi-pencil-square fs-6 me-3"></i>
              O'zgartirish
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Profil;
