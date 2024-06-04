import axios from "./api";

export const Faculties = {
    async getFacultiesApi() {
        const response = await axios.get(`faculties/`);
        return response.data;
    },
};
