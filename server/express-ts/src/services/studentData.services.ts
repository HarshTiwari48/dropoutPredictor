import { StudentData } from "../models/studentData.model";

export const upsertStudentData = async (data: any) => {
  return StudentData.findOneAndUpdate(
    { email: data.email },
    { $set: data },
    {
      upsert: true,
      new: true,
    }
  );
};
