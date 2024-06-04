import { useState, useEffect } from "react";
import { SubFaculties } from "../services/subFaculties";

const useSubFaculties = () => {
    const [subFaculties, setSubFaculties] = useState([]);

    const getSubFaculties = async () => {
        try {
            const response = await SubFaculties.getSubFacultiesApi();
            setSubFaculties(response);
        } catch (error) {
            console.error("Fakultetlarni olishda xatolik yuz berdi:", error);
        }
    };

    useEffect(() => {
        getSubFaculties();
    }, []);

    return { subFaculties };
};

export default useSubFaculties;
