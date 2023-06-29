import React, { useEffect, useState } from "react";
import { StudentsArticle } from "../../services/article";
import "./Article.css";
const initialState = {
  name: "",
  file: "",
  student: "",
};

const Article = () => {
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
      const response = await StudentsArticle.addArticle(formData);
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
    if (
      file.type !== "application/pdf" &&
      file.type !== "application/msword" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // docx
    ) {
      return "Fayl PDF, Word yoki Docx formatida bo'lishi kerak";
    }
    return null;
  };

  const validateFileName = (name) => {
    if (!name.trim()) {
      return "Ism maydoni to'ldirilishi kerak";
    }
    return null;
  };

  const [article, setArticle] = useState([]);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await StudentsArticle.getArticle(studentId);
        setArticle(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getArticle(studentId);
  }, [post]);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Yutuqni o'chirish funksiyasi
  const deleteArticle = async (id) => {
    try {
      // Delete requestni yuborish
      await StudentsArticle.deleteArticle(id);
      // Yutuqni o'chirgandan keyin yutuqlarni qaytarish
      const updateArticle = article.filter((articl) => articl.id !== id);
      setArticle(updateArticle);
      // Tasdiqlashni olib tashlash
      setConfirmDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const [editErr, setEditErr] = useState({});

  const [edit, setEdit] = useState({
    id: "",
    name: "",
    student: "",
  });

  const [confirmEdit, setConfirmEdit] = useState(false);

  const handleEdit = async () => {
    const nameError = validateFileName(edit.name);
    const fileError = validateFileType(edit.file);

    if (nameError || fileError) {
      setEditErr({ name: nameError, file: fileError });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", edit.name);
      formData.append("student", edit.student);
      formData.append("file", edit.file);

      const response = await StudentsArticle.editArticle(edit.id, formData);
      const updatedArticle = article.map((articl) =>
        articl.id === edit.id ? response : articl
      );
      setArticle(updatedArticle);
      setEdit({ id: "", name: "", student: "", file: null });
      setEditErr({});
      setConfirmEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mb-3 card bg-white mb-5">
        <form className="card-body" onSubmit={handleForm}>
          <h4 className="title text-center py-2">Maqola qo'shish</h4>
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
        {article.filter((articl) => articl.student == studentId).length > 0 ? (
          article
            .filter((articl) => articl.student == studentId)
            .map((articl) => {
              const createAtDate = new Date(articl.create_at);
              const year = createAtDate.getFullYear();
              const month = createAtDate.getMonth() + 1;
              const day = createAtDate.getDate();

              const formattedDate = `${year}-${month}-${day}`;

              return (
                <div
                  key={articl.id}
                  className="bg-white mb-3 d-flex align-items-center justify-content-between py-2 px-3 rounded shadow-sm"
                >
                  <div className="d-flex flex-column">
                    <h5>{articl.name}</h5>
                    <p className="text-secondary data">{formattedDate}</p>
                  </div>
                  <div>
                    <button
                      className="btn btn-info me-3"
                      onClick={() => {
                        setEdit({
                          id: articl.id,
                          name: articl.name,
                          student: articl.student,
                        });
                        setConfirmEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setConfirmDeleteId(articl.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
        ) : (
          <p className="text-center h5 text-danger mt-5">
            No articles available
          </p>
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
                onClick={() => deleteArticle(confirmDeleteId)}
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

      {confirmEdit && (
        <div className="modal-modal">
          <div className="modal-confirmation-modal text-center rounded w-50">
            <p>Tahrirlash</p>
            <form onSubmit={submit}>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Nomi</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={edit.name}
                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  />
                  {editErr.name && (
                    <p className="error-message text-danger">{editErr.name}</p>
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
                    onChange={(e) =>
                      setEdit({ ...edit, file: e.target.files[0] })
                    }
                  />
                  {editErr.file && (
                    <p className="error-message text-danger">{editErr.file}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 text-end">
                  <button
                    className="btn btn-primary px-4 me-3"
                    onClick={() => {
                      handleEdit();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary px-4"
                    onClick={() => {
                      setEdit({ id: "", name: "", student: "" });
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
      )}
    </>
  );
};

export default Article;
