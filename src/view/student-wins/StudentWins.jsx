import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { StudentWinRepository } from "../../services/studentWin";
import "./StudentWins.css";

const initialState = {
  name: "",
  file: "",
  student: "",
  create_at: new Date(),
};

const StudentWins = () => {
  const studentId = localStorage.getItem("studentId");

  const [post, setPost] = useState(initialState);

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    if (e.target.name === "file") {
      setPost({ ...post, file: e.target.files[0] });
    } else if (e.target.name === "name") {
      setPost({ ...post, name: e.target.value });
    } else if (e.target.name === "student") {
      setPost({ ...post, student: e.target.value });
    }
  };

  const clearForm = () => {
    setPost(initialState);
    setErrors({});
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", post.name);
    formData.append("student", studentId);
    formData.append("file", post.file);

    const fileTypeError = validateFileType(post.file);
    const fileNameError = validateFileName(post.name);

    if (fileTypeError || fileNameError) {
      setErrors({ file: fileTypeError, name: fileNameError });
      return;
    }

    try {
      const response = await StudentWinRepository.postWin(formData);
      clearForm();
      setErrors({});
      return response;
    } catch (error) {
      console.log(error.response.data); // Xatolikni ko'rsatish
    }
  };

  const validateFileType = (file) => {
    if (!file) {
      return "Fayl tanlanmagan";
    }
    if (file.type !== "application/pdf" && file.type !== "application/msword") {
      return "Fayl PDF yoki Word formatida bo'lishi kerak";
    }
    return null;
  };

  const validateFileName = (name) => {
    if (!name.trim()) {
      return "Ism maydoni to'ldirilishi kerak";
    }
    return null;
  };

  const [wins, setWins] = useState([]);

  useEffect(() => {
    const getWins = async () => {
      try {
        const response = await StudentWinRepository.getWin(studentId);
        setWins(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getWins(studentId);
  }, [post]);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Yutuqni o'chirish funksiyasi
  const deleteWin = async (id) => {
    try {
      // Delete requestni yuborish
      await StudentWinRepository.deleteWin(id);
      // Yutuqni o'chirgandan keyin yutuqlarni qaytarish

      const updatedWins = wins.filter((win) => win.id !== id);
      setWins(updatedWins);
      // Tasdiqlashni olib tashlash
      setConfirmDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // const [postEdit, setPostEdit] = useState({
  //     name: "",
  //     file: "",
  //     student: "10",
  //     create_at: new Date()
  // })
  // const [confirmEdit, setConfirmEdit] = useState(false)

  // const editWin = async (id) => {
  //     try {
  //         // Yutuq ma'lumotlarini API dan olish
  //         const response = await StudentWinRepository.editWin(id);
  //         const winData = response.result;

  //         // Tahrirlash uchun yutuq ma'lumotlarini asosiy holatga o'rnating
  //         setPostEdit({
  //             name: winData.name,
  //             file: "", // Fayl maydonini avtomatik to'ldirishni istamasangiz
  //             student: winData.student,
  //             create_at: new Date()
  //         });

  //         // Tahrirlash oynasini ko'rsatish
  //         setConfirmEdit(true);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  return (
    <>
      <div className="mb-3 card bg-white mb-5">
        <form className="card-body" onSubmit={handleForm}>
          <h4 className="title text-center py-2">Talabaning yutuqlari</h4>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Nomi</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                value={post.name}
                name="name"
                onChange={onChange}
              />
              {errors.name && (
                <p className="error-message text-danger">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">pdf yoki wort ma'lumot</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="file"
                className="form-control"
                name="file"
                onChange={onChange}
              />
              {errors.file && (
                <p className="error-message text-danger">{errors.file}</p>
              )}
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
      <div className="w-100">
        {wins.length > 0 ? (
          wins.map((win) => (
            <div
              key={win.id}
              className="bg-white mb-3 d-flex align-items-center justify-content-between py-2 px-3 rounded shadow-sm"
            >
              <h5>{win.name}</h5>
              <div>
                <button className="btn btn-info me-3">Edit</button>
                <button
                  className="btn btn-danger"
                  onClick={() => setConfirmDeleteId(win.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center h5 text-danger mt-5">No wins available</p>
        )}
      </div>
      {/* Tasdiqlash oynasi start*/}

      {confirmDeleteId && (
        <div className="delet-modal">
          <div className="delete-confirmation-modal text-center rounded w-25">
            <p>Yutuqni o'chirishga rozimisiz?</p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary px-4"
                onClick={() => deleteWin(confirmDeleteId)}
              >
                Ha
              </button>
              <button
                className="btn btn-secondary px-3"
                onClick={() => setConfirmDeleteId(null)}
              >
                Yo'q
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Tasdiqlash oynasi end*/}
      {/* Edit oynasi start */}
      {/* {confirmEdit && (
                            <div className="delet-modal">
                                <div className="delete-confirmation-modal text-center rounded w-50">
                                    <p>Tahrirlash</p>
                                    <form action="" onSubmit={handleEdit}>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Nomi</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={postEdit.name}
                                                    name="name"
                                                    onChange={onChange}
                                                />
                                                {errors.name && <p className="error-message text-danger">{errors.name}</p>}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">pdf yoki wort ma'lumot</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="file"
                                                    onChange={onChangeEdit}
                                                />
                                                {errors.file && <p className="error-message text-danger">{errors.file}</p>}
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-primary px-4 me-3"
                                            >
                                                Tahrirlash
                                            </button>
                                            <button className="btn btn-secondary px-3"
                                                onClick={() => setConfirmEdit(false)}>
                                                Bekor qilish
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )} */}
    </>
  );
};

export default StudentWins;
