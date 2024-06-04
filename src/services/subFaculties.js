import axios from "./api";

export const SubFaculties = {
    async getSubFacultiesApi(data) {
        const response = await axios.get(`sub-faculties/`, data);
        return response.data;
    },
};