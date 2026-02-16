import api from "../axios";

//get My data (STUDENT)

export const getMyStudentData = async () => {
    const { data } = await api.get("/students/me/data")
    return data;
};