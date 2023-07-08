import React, { useEffect, useState } from "react";
import { MessageApi } from "../../services/message";
import { StudentWinRepository } from "../../services/studentWin";
import "./StudentWins.css";

const initialState = {
  name: "",
  file: "",
  student: "",
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
      console.log(error.response.data);
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
      return "Nom maydoni to'ldirilishi kerak";
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

  const deleteWin = async (id) => {
    try {
      await StudentWinRepository.deleteWin(id);
      const updatedWins = wins.filter((win) => win.id !== id);
      setWins(updatedWins);
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

      const response = await StudentWinRepository.editWin(edit.id, formData);
      const updatedWins = wins.map((win) =>
        win.id === edit.id ? response : win
      );
      setWins(updatedWins);
      setEdit({ id: "", name: "", student: "", file: null });
      setConfirmEdit(false);
      setEditErr({});
    } catch (error) {
      console.log(error);
    }
  };

  const submit = (e) => {
    e.preventDefault();
  };
  // message start
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [message, setMessage] = useState([]);
  const [filterMessage, setFilterMessage] = useState([]);
const [dd,setDd]=useState(null)

  useEffect(() => {
    const getMessageFunction = async () => {
      const response = await MessageApi.getMessage();
      setMessage(response.results);
    };
    getMessageFunction();
  }, []);

  useEffect(() => {
    const filteredMessages = message.filter(
      (e) => e.student === Number(localStorage.getItem("studentId"))
    );
    setFilterMessage(filteredMessages);
  }, [message]);
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
        {wins.filter((win) => win.student == studentId).length > 0 ? (
          wins
            .filter((win) => win.student == studentId)
            .map((win) => {
              const createAtDate = new Date(win.create_at);
              const year = createAtDate.getFullYear();
              const month = String(createAtDate.getMonth() + 1).padStart(
                2,
                "0"
              );
              const day = String(createAtDate.getDate()).padStart(2, "0");

              const formattedDate = `${day}.${month}.${year}`;
              return (
                <div
                  key={win.id}
                  className="bg-white mb-3 d-flex align-items-center
                   justify-content-between py-2 px-3 rounded shadow-sm"
                >
                  <div className="d-flex flex-column">
                    <h5 className="m-0">{win.name}</h5>
                    <p className="text-secondary data m-0">{formattedDate}</p>
                  </div>
                  <div>
                    <button
                      className={`bi bi-chat-left-text btn  py-1 px-2 me-3 btn-outline-secondary`}
                      onClick={() => setSelectedArticleId(win.id)}
                    ></button>
                    <button
                      className="btn btn-outline-info me-3 bi bi-pen-fill py-1 px-2"
                      onClick={() => {
                        setEdit({
                          id: win.id,
                          name: win.name,
                          student: win.student,
                        });
                        setConfirmEdit(true);
                      }}
                    ></button>
                    <button
                      className="btn btn-outline-danger bi bi-trash py-1 px-2"
                      onClick={() => setConfirmDeleteId(win.id)}
                    ></button>
                  </div>
                </div>
              );
            })
        ) : (
          <p className="text-center h5 text-danger mt-5">No wins available</p>
        )}
      </div>

      {selectedArticleId && (
        <div className="modal-modal">
          <div className="modal-confirmation-modal text-center rounded w-50">
            <div className="d-flex">
              <div
                className="bi bi-x-lg btn ms-auto"
                onClick={() => {
                  setSelectedArticleId(false);
                }}
              ></div>
            </div>
            {filterMessage
              .filter((e) => e.article == null)
              .filter((e) => e.win == selectedArticleId)
              .map((e) => {
                const createAtDate = new Date(e.create_at);
                const year = createAtDate.getFullYear();
                const month = String(createAtDate.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(createAtDate.getDate()).padStart(2, "0");
                const formattedDate = `${day}.${month}.${year}`;
                return (
                  <div key={e.id} className="message-item">
                    <p>{e.letter }</p>
                    <p>{formattedDate}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {confirmDeleteId && (
        <div className="modal-modal">
          <div className="modal-confirmation-modal text-center rounded w-25">
            <p>Yutuqni o'chirishga rozimisiza?</p>
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
                    Tahrirlash
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

export default StudentWins;
