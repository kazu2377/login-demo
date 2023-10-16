import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";

function Users() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("students").select(
        `
          student_id,
          login_id,
          name,
          created_at,
          updated_at,
          generation_num,
          attendance_records:attendance_records (date, status, time)
          `
      );

      if (error) {
        console.error("Error fetching records:", error);
      } else {
        setRecords(data);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {records.map((record) => (
        <div key={record.student_id}>
          <p>Student ID: {record.student_id}</p>
          <p>Login ID: {record.login_id}</p>
          <p>Name: {record.name}</p>
          <p>Created At: {record.created_at}</p>
          <p>Updated At: {record.updated_at}</p>
          <p>Generation Num: {record.generation_num}</p>
          <h2>Attendance Records</h2>
          {record.attendance_records.map((attendance, index) => (
            <div key={index}>
              <p>Date: {attendance.date}</p>
              <p>Status: {attendance.status}</p>
              <p>Time: {attendance.time || "N/A"}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Users;
