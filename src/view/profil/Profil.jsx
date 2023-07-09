import React, { useEffect, useMemo, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "../../services/api";
import { StudentsRepository } from "../../services/students";
import "./Profil.css";
import { Faculties } from "../../services/faculties";
import { SubFaculties } from "../../services/subFaculties";

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

    const getUserInfo = async (userId) => {
      try {
        const response = await axios.get(`auth/user/${userId}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo(decoded.user_id);
    getStudentInfo(decoded.user_id);
  }, []);

  const initialState = {
    id: "",
    faculty: 0,
    group: "",
    course: "",
    passport_number: "",
    phone_number: "",
    status: true,
    region: "",
    district: "",
    street: "",
    base_student: "",
    sub_faculty: 0,
  };
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [edit, setEdit] = useState(initialState);

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", edit.image);
      formData.append("resume", edit.resume);
      formData.append("passport_or_idcart_file", edit.passport_or_idcart_file);
      formData.append("passport_number", edit.passport_number);
      formData.append("region", edit.region);
      formData.append("phone_number", edit.phone_number);
      formData.append("district", edit.district);
      formData.append("street", edit.street);
      formData.append("faculty", edit.faculty);

      formData.append("sub_faculty", edit.sub_faculty);
      formData.append("course", edit.course);
      formData.append("group", edit.group);
      formData.append("base_student", decoded.user_id);

      const response = await StudentsRepository.putStidents(edit.id, formData);
      const updatedProfile = student.map((e) =>
        e.id === edit.id ? response : e
      );
      setStudent(updatedProfile);
      setConfirmEdit(false);
      setEdit(initialState);
    } catch (error) {
      console.log(error);
    }
  };
  const submit = (e) => {
    e.preventDefault();
  };

  const [faculties, setFaculties] = useState([]);
  const [subFaculties, setSubFaculties] = useState([]);

  const getFacultiesFunction = async () => {
    try {
      const response = await Faculties.getFaculties();
      setFaculties(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubFaculties = async () => {
    try {
      const response = await SubFaculties.getSubFaculties();
      setSubFaculties(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFacultiesFunction();

    getSubFaculties();
  }, []);

  const [filteredSubFaculties, setWays] = useState([]);

  useMemo(() => {
    const filteredSubFaculties = subFaculties.filter(
      (subObject) => subObject.faculty.id == Number(edit.faculty)
    );
    setWays(filteredSubFaculties);
  }, [edit.faculty]);

  console.log(student.faculty);

  return (
    <>
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
              {student.faculty ? (
                faculties
                  .filter((e) => e.id === Number(student.faculty))
                  .map((e) => <span key={e.id}>{e.name}</span>)
              ) : (
                <span>Malumot kiritilmagan</span>
              )}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Yo'nalish</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {student.sub_faculty ? (
                subFaculties
                  .filter((e) => e.id === Number(student.sub_faculty))
                  .map((e) => <span key={e.id}>{e.name}</span>)
              ) : (
                <>Ma'lumot kiritilmagan</>
              )}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Kurs va Guruh</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {student.course
                ? `${student.course}-kurs`
                : "Ma'lumot kiritilmagan"}{" "}
              {student.group ? `${student.group} guruh talabasi` : ""}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Viloyat</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {student.region ? student.region : "Ma'lumot kiritilmagan"}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Tuman</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {student.district ? student.district : "Ma'lumot kiritilmagan"}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Mahalla</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {student.street ? student.street : "Ma'lumot kiritilmagan"}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Pasport raqami</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {student.passport_number
                ? student.passport_number
                : "Ma'lumot kiritilmagan"}
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-info"
              onClick={() => {
                setEdit({
                  id: student.id,
                  faculty: student.faculty,
                  sub_faculty: student.sub_faculty,
                  group: student.group,
                  course: student.course,
                  passport_number: student.passport_number,
                  phone_number: student.phone_number,
                  status: true,
                  region: student.region,
                  district: student.district,
                  street: student.street,
                  base_student: student.base_student,
                  sub_faculty: student.sub_faculty,
                });
                setConfirmEdit(true);
              }}
            >
              Tahrirlash
            </button>
          </div>
        </div>
      </div>
      {confirmEdit && (
        <div className="modal-modal">
          <div className="modal-confirmation-modal text-center rounded w-50">
            <div className="card-body">
              <form onSubmit={submit}>
                <h4 className="title text-center py-2">
                  Shaxsiy malumotlarni Tahrirlash
                </h4>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Pasport raqami</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      name="passport_number"
                      value={edit.passport_number}
                      placeholder="AA 1111111"
                      onChange={(e) =>
                        setEdit({ ...edit, passport_number: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Tel raqami</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      name="phone_number"
                      value={edit.phone_number}
                      placeholder="+998 90 999 9999"
                      onChange={(e) =>
                        setEdit({ ...edit, phone_number: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Viloyat</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setEdit({ ...edit, region: e.target.value })
                      }
                      name="region"
                      value={edit.region}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Tuman (Shahar)</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      onChange={(e) =>
                        setEdit({ ...edit, district: e.target.value })
                      }
                      name="district"
                      className="form-control"
                      value={edit.district}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Ko'cha</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      value={edit.street}
                      onChange={(e) =>
                        setEdit({ ...edit, street: e.target.value })
                      }
                      name="street"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Obyektivka</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="file"
                      className=" form-control"
                      onChange={(e) =>
                        setEdit({ ...edit, resume: e.target.files[0] })
                      }
                      name="resume"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Paspot yoki Id karta (pdf)</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          passport_or_idcart_file: e.target.files[0],
                        })
                      }
                      name="passport_or_idcart_file"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Rasm</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      className="form-control"
                      type="file"
                      name="image"
                      onChange={(e) =>
                        setEdit({ ...edit, image: e.target.files[0] })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Fakultet :</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <select
                      className="form-select"
                      name="faculty"
                      onChange={(e) =>
                        setEdit({ ...edit, faculty: e.target.value })
                      }
                      value={edit.faculty}
                    >
                      <option>Fakultetni tanlang</option>
                      {faculties.map((facultyObject) => (
                        <option key={facultyObject.id} value={facultyObject.id}>
                          {facultyObject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Yo'nalishi</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <select
                      className="form-select"
                      name="sub_faculty"
                      onChange={(e) =>
                        setEdit({ ...edit, sub_faculty: e.target.value })
                      }
                      value={edit.sub_faculty}
                    >
                      <option>Yo'nalishni tanlang</option>
                      {edit.faculty &&
                        filteredSubFaculties.map((subObject) => (
                          <option key={subObject.id} value={subObject.id}>
                            {subObject.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Kurs</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      name="course"
                      onChange={(e) =>
                        setEdit({ ...edit, course: e.target.value })
                      }
                      value={edit.course}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Guruh</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setEdit({ ...edit, group: e.target.value })
                      }
                      value={edit.group}
                      name="group"
                    />
                  </div>
                </div>
                {/* {saveMessage && <>{saveMessage}</>} */}

                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <button
                      className="btn btn-primary px-4 me-3"
                      onClick={() => {
                        handleEdit();
                      }}
                    >
                      Tahrirlash
                    </button>
                    <button
                      className="btn btn-secondary px-4"
                      onClick={() => {
                        setEdit({
                          id: "",
                          faculty: "",
                          sub_faculty: "",
                          group: "",
                          course: "",
                          passport_number: "",
                          phone_number: "",
                          status: true,
                          region: "",
                          district: "",
                          street: "",
                          base_student: "",
                          sub_faculty: "",
                        });
                        setConfirmEdit(false);
                      }}
                    >
                      Bekor qilish
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profil;
