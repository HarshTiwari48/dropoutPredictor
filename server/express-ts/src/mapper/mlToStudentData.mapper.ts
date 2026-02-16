export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type AcademicTrend = "IMPROVING" | "DECLINING" | "STABLE";

export const mapMLRowToStudentData = (row: any) => {
  const sem1Grade = Number(row["Curricular units 1st sem (grade)"]);
  const sem2Grade = Number(row["Curricular units 2nd sem (grade)"]);

  //  academic trend 
  let academicTrend: AcademicTrend = "STABLE";

  if (!isNaN(sem1Grade) && !isNaN(sem2Grade)) {
    if (sem2Grade > sem1Grade) academicTrend = "IMPROVING";
    else if (sem2Grade < sem1Grade) academicTrend = "DECLINING";
  }

  //  dropout risk 
  const dropoutProbability = Number(row["dropout_probability_%"]);

  let riskLevel: RiskLevel = "LOW";
  if (dropoutProbability >= 70) riskLevel = "HIGH";
  else if (dropoutProbability >= 40) riskLevel = "MEDIUM";

  //info personal
  const rawGender = Number(row["Gender"]);

let gender: "Male" | "Female" | "Other" = "Other";
if (rawGender === 1) gender = "Male";
else if (rawGender === 0) gender = "Female";

const age = Number(row["Age"]);


  return {
    email: row.Email,          // IMPORTANT..... capital E
    name: row.Name,

    age: isNaN(age) ? null : age,
    gender,

    dropoutProbability,
    riskLevel,

    sem1Grade: isNaN(sem1Grade) ? null : sem1Grade,
    sem2Grade: isNaN(sem2Grade) ? null : sem2Grade,

    enrolledUnitsSem1: Number(
      row["Curricular units 1st sem (enrolled)"]
    ),

    approvedUnitsSem1: Number(
      row["Curricular units 1st sem (approved)"]
    ),

    enrolledUnitsSem2: Number(
      row["Curricular units 2nd sem (enrolled)"]
    ),

    approvedUnitsSem2: Number(
      row["Curricular units 2nd sem (approved)"]
    ),

    academicTrend,
    lastEvaluatedAt: new Date(),
  };
};
