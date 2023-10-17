import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import supabase from "./supabaseClient";
//... (他のimport文は変わらず)

import { ToastContainer, toast } from "react-toastify"; // 通知メッセージの表示のため
import "react-toastify/dist/ReactToastify.css"; // 通知スタイル

const Dashboard = ({ studentId, username }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const [attendanceCounts, setAttendanceCounts] = useState({
    attendance: 0,
    late: 0,
    leaveEarly: 0,
    absence: 0,
  });

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

    if (error) {
      console.error("Error fetching attendance records:", error);
    } else if (data && data[0] && data[0].attendance_records) {
      // setAttendanceRecords(data[0].attendance_records);
      const sortedRecords = sortRecordsByDateAndTime(
        data[0].attendance_records
      );
      setAttendanceRecords(sortedRecords);
      // Calculate the counts for each attendance status
      const newCounts = {
        attendance: 0,
        late: 0,
        leaveEarly: 0,
        absence: 0,
      };

      data[0].attendance_records.forEach((record) => {
        switch (record.status) {
          case "出席":
            newCounts.attendance += 1;
            break;
          case "遅刻":
            newCounts.late += 1;
            break;
          case "早退":
            newCounts.leaveEarly += 1;
            break;
          case "欠席":
            newCounts.absence += 1;
            break;
          default:
            // no default action
            break;
        }
      });

      setAttendanceCounts(newCounts); // Update the state with the new counts
    }
  }, [studentId]);

  useEffect(() => {
    fetchAttendanceRecordsForStudent();
  }, [fetchAttendanceRecordsForStudent]);

  async function deleteRecord(recordId) {
    try {
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

  async function addAttendanceRecord(status, time = null) {
    try {
      const { data, error } = await supabase.from("attendance_records").insert([
        {
          student_id: studentId,
          date: selectedDate,
          status: status,
          time: time,
          generation_num: 0,
          created_at: new Date().toISOString(), // 明示的に現在の日付と時刻を設定
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success("データを追加しました。");
      fetchAttendanceRecordsForStudent();
    } catch (error) {
      console.error("Error adding record:", error);
      toast.error("データの追加に失敗しました。");
    }
  }

  function getStatusClass(status) {
    switch (status) {
      case "出席":
        return "text-success";
      case "遅刻":
        return "text-warning";
      case "早退":
        return "text-info";
      case "欠席":
        return "text-danger";
      default:
        return "";
    }
  }

  function sortRecordsByDateAndTime(records) {
    return records.sort((a, b) => {
      // 日付の比較
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;

      // 日付が同じ場合は時刻で比較
      if (a.time && b.time) {
        if (a.time > b.time) return -1;
        if (a.time < b.time) return 1;
      } else if (a.time) {
        // a には時刻があり、b には時刻がない場合
        return -1;
      } else if (b.time) {
        // b には時刻があり、a には時刻がない場合
        return 1;
      }

      return 0;
    });
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="text-center mb-5">出席管理ダッシュボード</h2>
      <h4 className="mb-4">学生ID: {username}</h4>
      <div className="mb-4">
        出席回数: {attendanceCounts.attendance}
        遅刻回数: {attendanceCounts.late}
        早退回数: {attendanceCounts.leaveEarly}
        欠席回数: {attendanceCounts.absence}
      </div>
      <div className="mb-4 d-flex justify-content-around">
        <button
          className="btn btn-success btn-lg"
          onClick={() => addAttendanceRecord("出席")}
        >
          出席
        </button>
        <button
          className="btn btn-warning btn-lg"
          onClick={() => addAttendanceRecord("遅刻", selectedTime)}
        >
          遅刻
        </button>
        <button
          className="btn btn-danger btn-lg"
          onClick={() => addAttendanceRecord("欠席")}
        >
          欠席
        </button>
        <button
          className="btn btn-info btn-lg"
          onClick={() => addAttendanceRecord("早退", selectedTime)}
        >
          早退
        </button>
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
              <td className={getStatusClass(record.status)}>{record.status}</td>
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
