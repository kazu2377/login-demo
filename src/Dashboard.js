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

  const [studentData, setStudentData] = useState(null);

  const [attendanceCounts, setAttendanceCounts] = useState({
    attendance: 0,
    late: 0,
    leaveEarly: 0,
    absence: 0,
  });

  const updateAttendanceCounts = (records) => {
    const newCounts = {
      attendance: 0,
      late: 0,
      leaveEarly: 0,
      absence: 0,
    };

    records.forEach((record) => {
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

    setAttendanceCounts(newCounts);
  };

  const fetchAttendanceRecordsForStudent = useCallback(async () => {
    //   const { data, error } = await supabase
    //     .from("students")
    //     .select(
    //       `
    //   student_id,
    //   attendance_records:attendance_records(record_id, date, status, time)
    // `
    //     )
    //     .eq("student_id", studentId)
    //     .eq("generation_num", 0)
    //     .filter("attendance_records.generation_num", "eq", 0);

    const { data, error } = await supabase
      .from("students")
      .select(
        `
    student_id,
    attendance_records:attendance_records(record_id, date, status, time),
    class:classes(class_name, class_time, max_absences, division)
  `
      )
      .eq("student_id", studentId)
      .eq("generation_num", 0)
      .filter("attendance_records.generation_num", "eq", 0);

    if (error) {
      console.error("Error fetching attendance records:", error);
    } else if (data && data[0] && data[0].attendance_records) {
      // setAttendanceRecords(data[0].attendance_records);

      //class名などを取得するため１レコードだけ取得してセットしている
      setStudentData(data[0]);

      const sortedRecords = sortRecordsByDateAndTime(
        data[0].attendance_records
      );

      setAttendanceRecords(sortedRecords);
      // Calculate the counts for each attendance status
      updateAttendanceCounts(data[0].attendance_records);
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

      const updatedRecords = attendanceRecords.filter(
        (record) => record.record_id !== recordId
      );
      updateAttendanceCounts(updatedRecords);
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("データの削除に失敗しました。");
    }
  }

  async function addAttendanceRecord(status, time = null) {
    try {
      const { error } = await supabase.from("attendance_records").insert([
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

  const totalAbsence =
    attendanceCounts.late * 0.5 +
    attendanceCounts.leaveEarly * 0.5 +
    attendanceCounts.absence;
  // 端数が0.5以上なら、1増やす
  const roundedTotalAbsence = Math.ceil(totalAbsence);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="text-center mb-5">出席管理ダッシュボード</h2>
      <h4 className="mb-4">学生ID: {username}</h4>

      {/* class名や授業時間などを表示する */}
      {studentData && studentData.class && (
        <>
          <h5>クラス名: {studentData.class.class_name}</h5>
          <p>授業時間: {studentData.class.class_time}</p>
          <p>最大欠席日数: {studentData.class.max_absences}</p>
          <p>区分: {studentData.class.division}</p>
        </>
      )}

      <span className="mb-4 large-text">
        総欠席回数(端数切り上げ): {roundedTotalAbsence}
      </span>

      <div className="mb-4 large-text">
        <span>出席回数: {attendanceCounts.attendance}</span>
        <span>遅刻回数: {attendanceCounts.late}</span>
        <span>早退回数: {attendanceCounts.leaveEarly}</span>
        <span>欠席回数: {attendanceCounts.absence}</span>
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
      {/* <div className="text-center">
        <button className="btn btn-primary">保存</button>
      </div> */}
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
