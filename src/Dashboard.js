import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import supabase from "./supabaseClient";
//... (他のimport文は変わらず)

import { toast } from "react-toastify"; // 通知メッセージの表示のため
import "react-toastify/dist/ReactToastify.css"; // 通知スタイル

const Dashboard = ({ studentId }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const attendanceCounts = {
    // 仮の出欠席データ
    attendance: 10,
    late: 2,
    leaveEarly: 1,
    absence: 0,
  };

  const fetchAttendanceRecordsForStudent = useCallback(async () => {
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

    // const { data, error } = await supabase
    //   .from("students")
    //   .select(
    //     `
    //     student_id,
    //     attendance_records:attendance_records (
    //         record_id,
    //         date,
    //         status,
    //         time
    //     )
    // `
    //   )
    //   .eq("student_id", studentId)
    //   .eq("generation_num", 0)
    //   .filter("attendance_records", "generation_num", "eq", 0); // この行を追加

    if (error) {
      console.error("Error fetching attendance records:", error);
    } else if (data && data[0] && data[0].attendance_records) {
      setAttendanceRecords(data[0].attendance_records);
    }
  }, [studentId]);

  useEffect(() => {
    fetchAttendanceRecordsForStudent();
  }, [fetchAttendanceRecordsForStudent]);

  async function deleteRecord(recordId) {
    try {
      // const { error } = await supabase
      //   .from("attendance_records")
      //   .delete()
      //   .eq("record_id", recordId);

      // if (error) {
      //   throw error;
      // }

      await supabase
        .from("attendance_records")
        .update({ generation_num: 1 })
        .eq("record_id", recordId);

      toast.success("データを削除しました。");

      fetchAttendanceRecordsForStudent();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("データの削除に失敗しました。");
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">出席管理ダッシュボード</h2>
      <h4 className="mb-4">学生ID: {studentId}</h4>
      <div className="mb-4">
        出席回数: {attendanceCounts.attendance}
        遅刻回数: {attendanceCounts.late}
        早退回数: {attendanceCounts.leaveEarly}
        欠席回数: {attendanceCounts.absence}
      </div>
      <div className="mb-4 d-flex justify-content-around">
        <button className="btn btn-success btn-lg">出席</button>
        <button className="btn btn-warning btn-lg">遅刻</button>
        <button className="btn btn-danger btn-lg">欠席</button>
        <button className="btn btn-info btn-lg">早退</button>
      </div>
      <div className="mb-4">
        <label htmlFor="datePicker" className="form-label">
          日付:
        </label>
        <input
          type="date"
          id="datePicker"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="timePicker" className="form-label">
          時間 (遅刻・早退の際):
        </label>
        <input
          type="time"
          id="timePicker"
          className="form-control"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary">保存</button>
      </div>
      <h4 className="mt-5 mb-3">受講生の出欠席一覧</h4>
      <table className="table">
        <thead>
          <tr>
            <th>日付</th>
            <th>状態</th>
            <th>時刻</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.status}</td>
              <td>{record.time || "なし"}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteRecord(record.record_id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
