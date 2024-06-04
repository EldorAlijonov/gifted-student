import { useState, useEffect } from "react";
import { Faculties } from "../services/faculties";

const useFaculties = () => {
    const [faculties, setFaculties] = useState([]);

    const getFaculties = async () => {
        try {
            const response = await Faculties.getFacultiesApi();
            setFaculties(response);
        } catch (error) {
            console.error("Fakultetlarni olishda xatolik yuz berdi:", error);
        }
    };

    useEffect(() => {
        getFaculties();
    }, []);

    return { faculties };
};

export default useFaculties;
