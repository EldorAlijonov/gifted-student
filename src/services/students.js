import axios from "./api";

export const StudentsRepository = {
    async addStudents(data) {
        const response = await axios.post("students/create/", data);
        return response.data;
    },
    async getStudents(id) {
        const response = await axios.get(`students/by_customuser/${id}/`);
        return response.data;
    },
    async putStudents(id, updateData) {
        const response = await axios.put(`students/${id}/update/`, updateData);
        return response.data;
    },
};
