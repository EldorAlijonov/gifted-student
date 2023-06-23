import axios from "./api";

export const StudentWinRepository = {
  async postWin(data) {
    const response = await axios.post("student-wins/create/", data);

    return response;
  },

  async getWin(data) {
    const response = await axios.get("student-wins/", data);
    return response.data;
  },
  async deleteWin(id) {
    const response = await axios.delete(`student-wins/${id}/delete/`);
    return response.data;
  },
  async editWin(id, updatedData) {
    const response = await axios.put(`student-wins/${id}/update/`, updatedData);
    return response.data;
  },
};
