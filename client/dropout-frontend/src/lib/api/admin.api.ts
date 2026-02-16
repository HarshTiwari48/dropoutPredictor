import api from "../axios";

// Upload CSV (ADMIN)
export const uploadStudentsCSV = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post(
    "/admin/upload-students",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// Get all students (ADMIN)
export const getAllStudents = async () => {
  const { data } = await api.get("/admin/students");
  return data;
};

//all the routes need to be defined here of admin 
// remaining routes 
/*   
nodemailer (nevermind we created seperate apis for these)
*/ 