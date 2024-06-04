export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, data);
    } catch (error) {
        console.log("Error seving data");
    }
};

export const getItem = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.log("Error getting data");
    }
};

export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log("Error remove data");
    }
};

export const removeStudentId = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log("Error remove student Id");
    }
};