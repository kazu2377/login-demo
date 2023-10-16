import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      // 全てのカラムを選択
      const { data: Students, error } = await supabase
        .from("students")
        .select("*");

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(Students);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.student_id}>
          <p>Student ID: {user.student_id}</p>
          <p>Login ID: {user.login_id}</p>
          <p>Name: {user.name}</p>
          <p>Created At: {user.created_at}</p>
          <p>Updated At: {user.updated_at}</p>
          <p>Generation Num: {user.generation_num}</p>
          {/* 必要に応じて他のカラムも追加できます */}
        </div>
      ))}
    </div>
  );
}

export default Users;
