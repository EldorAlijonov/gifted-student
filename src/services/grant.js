import axios from "./api";

export const GrantApi = {
  async getGrant() {
    const response = await axios.get(`grant/`);
    return response.data;
  },
};
