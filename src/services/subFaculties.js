import axios from "./api";

export const SubFaculties = {
  async getSubFaculties() {
    const response = await axios.get(`sub-faculties/`);
    return response.data;
  },
};
