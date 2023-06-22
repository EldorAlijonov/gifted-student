import axios from "../../services/api";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { StudentsRepository } from "../../services/students";
import { Faculties } from "../../services/faculties";
import { SubFaculties } from "../../services/subFaculties";

const initialState = {
  faculty: "",
  image: null,
  group: "",
  course: "",
  passport_number: "",
  idcart_number: "",
  passport_or_idcart_file: null,
  status: false,
  region: "",
  district: "",
  street: "",
  resume: null,
  create_at: new Date(),
  base_student: "",
  sub_faculty: "",
};

const ProfilInfoAdd = () => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const [post, setPost] = useState(initialState);
  const [facultiesId, setFacultiesId] = useState("");

  const onChange = (e) => {
    if (e.target.name === "image") {
      setPost({ ...post, image: e.target.files[0] });
    } else if (e.target.name === "resume") {
      setPost({ ...post, resume: e.target.files[0] });
    } else if (e.target.name === "passport_or_idcart_file") {
      setPost({ ...post, passport_or_idcart_file: e.target.files[0] });
    } else if (e.target.name === "passport_number") {
      setPost({ ...post, passport_number: e.target.value });
    } else if (e.target.name === "region") {
      setPost({ ...post, region: e.target.value });
    } else if (e.target.name === "district") {
      setPost({ ...post, district: e.target.value });
    } else if (e.target.name === "street") {
      setPost({ ...post, street: e.target.value });
    } else if (e.target.name === "faculty") {
      const facultiesId = e.target.value;
      setFacultiesId(facultiesId);
      setPost({ ...post, faculty: e.target.value });
    } else if (e.target.name === "sub_faculty") {
      setPost({ ...post, sub_faculty: e.target.value });
    } else if (e.target.name === "course") {
      setPost({ ...post, course: e.target.value });
    } else if (e.target.name === "group") {
      setPost({ ...post, group: e.target.value });
    } else if (e.target.name === "base_student") {
      setPost({ ...post, base_student: e.target.value });
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const decodedId = decoded.user_id;

    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("resume", post.resume);
    formData.append("passport_or_idcart_file", post.passport_or_idcart_file);
    formData.append("passport_number", post.passport_number);
    formData.append("region", post.region);
    formData.append("district", post.district);
    formData.append("street", post.street);
    formData.append("faculty", post.faculty);
    formData.append("course", post.course);
    formData.append("group", post.group);
    formData.append("base_student", decodedId);
    try {
      const response = await StudentsRepository.addStudents(formData);
      return response;
    } catch (error) {
      console.log(error.response.data); // Xatolikni ko'rsatish
    }
  };
  const [faculties, setFaculties] = useState([]);

  const [subFaculties, setSubFaculties] = useState([]);
  console.log(subFaculties);

  useEffect(() => {
    const getFacultiesFunction = async () => {
      try {
        const response = await Faculties.getFaculties();
        setFaculties(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getFacultiesFunction();

    const getSubFaculties = async () => {
      try {
        const response = await SubFaculties.getSubFaculties(facultiesId);
        setSubFaculties(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getSubFaculties(faculties);
  }, []);

  return (
    <div className="mb-3 card bg-white">
      <div className="card-body">
        <form onSubmit={handleForm}>
          <h4 className="title text-center py-2">
            {" "}
            Shaxsiy malumotlarni kiritish
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
                value={post.passport_number}
                placeholder="AA 1111111"
                onChange={onChange}
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
                onChange={onChange}
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
              <input
                type="text"
                onChange={onChange}
                name="district"
                className="form-control"
                value={post.district}
              />
            </div>
          </div>

          {/* <input
            className="mt-3 form-control"
            type="file"
            name="image"
            onChange={onChange}
          />
          <input
            type="file"
            className="mt-3 form-control"
            onChange={onChange}
            name="resume"
          />
          <input
            type="file"
            className="mt-3 form-control"
            onChange={onChange}
            name="passport_or_idcart_file"
          /> */}

          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Ko'cha</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                value={post.street}
                onChange={onChange}
                name="street"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Paspot</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="file"
                className="mt-3 form-control"
                onChange={onChange}
                name="resume"
              />
              <input
                type="file"
                className="mt-3 form-control"
                onChange={onChange}
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
                onChange={onChange}
              />
            </div>
          </div>
          <h4 className="title text-center py-2">Ta'lim muosasasi</h4>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Fakultet :</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <select
                className="form-select"
                aria-label="Default select example"
                name="faculty"
                onChange={onChange}
                value={post.faculty}
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
                aria-label="Default select example"
                onChange={onChange}
                value={post.sub_faculty}
              >
                <option>Yo'nalishni tanlang</option>
                {subFaculties.map((facultyObject) => (
                  <option key={facultyObject.id} value={facultyObject.id}>
                    {facultyObject.name}
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
                onChange={onChange}
                value={post.course}
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
                onChange={onChange}
                value={post.group}
                name="group"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-end">
              <button className="btn btn-primary px-5" type="submit">
                Saqlash
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilInfoAdd;
