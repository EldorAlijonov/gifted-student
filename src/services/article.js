import axios from "./api";

export const StudentsArticle = {
  async addArticle(data) {
    const response = await axios.post("articles/create/", data);
    return response.data;
  },
  async getArticle(id) {
    const response = await axios.get(`articles/`);
    return response.data;
  },
  async deleteArticle(id) {
    const response = await axios.delete(`articles/${id}/delete/`);
    return response.data;
  },
};
