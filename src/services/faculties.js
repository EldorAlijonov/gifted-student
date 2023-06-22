import axios from "./api";

export const Faculties = {
  async getFaculties() {
    const response = await axios.get(`faculties/`);
    return response.data;
  },
};
