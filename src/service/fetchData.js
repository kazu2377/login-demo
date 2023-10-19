// fetchData.js
import { supabase } from "../../supabaseClient"; // Supabase clientのインポート。適切なパスを指定してください。

export async function fetchStudentData(studentId) {
  try {
    const { data, error } = await supabase
      .from("students")
      .select(
        `
        student_id,
        attendance_records:attendance_records(record_id, date, status, time)
      `
      )
      .eq("student_id", studentId)
      .eq("generation_num", 0)
      .filter("attendance_records.generation_num", "eq", 0);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
}
