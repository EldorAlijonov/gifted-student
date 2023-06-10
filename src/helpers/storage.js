export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, data);
    } catch (error) {
        console.log("Error seving data");
    }
}


export const getItem = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.log("Error getting data");
    }
}