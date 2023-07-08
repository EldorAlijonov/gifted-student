import axios from "./api";

export const StudentsRepository = {
  async addStudents(data) {
    const response = await axios.post("students/create/", data);
    return response;
  },
  async getStudents(id) {
    const response = await axios.get(`students/by_customuser/${id}/`);
    return response;
  },
  async putStidents(id, updataData) {
    const response = await axios.put(`students/${id}/update/`, updataData);
    return response;
  },
};
