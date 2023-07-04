import axios from "./api";

export const MessageApi = {
  async getMessage() {
    const response = await axios.get(`messages//`);
    return response.data;
  },
};
