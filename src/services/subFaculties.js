import axios from "./api";

export const SubFaculties = {
  async getSubFaculties(id) {
    const response = await axios.get(`sub-faculties/${id}/`);
    return response.data;
  },
};
