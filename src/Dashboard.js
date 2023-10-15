import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("12:00");
  const userId = "12345"; // 仮のユーザーID
  const attendanceCounts = {
    // 仮の出欠席データ
    attendance: 10,
    late: 2,
    leaveEarly: 1,
    absence: 0,
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">出席管理ダッシュボード</h2>

      {/* ユーザーID */}
      <h4 className="mb-4">ユーザーID: {userId}</h4>

      {/* 出欠席回数 */}
      <div className="mb-4">
        出席回数: {attendanceCounts.attendance}
        遅刻回数: {attendanceCounts.late}
        早退回数: {attendanceCounts.leaveEarly}
        欠席回数: {attendanceCounts.absence}
      </div>

      {/* ボタン群 */}
      <div className="mb-4 d-flex justify-content-around">
        <button className="btn btn-success btn-lg">出席</button>
        <button className="btn btn-warning btn-lg">遅刻</button>
        <button className="btn btn-danger btn-lg">欠席</button>
        <button className="btn btn-info btn-lg">早退</button>
      </div>

      {/* 日付選択 */}
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

      {/* 時間選択 */}
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

      {/* 保存ボタン */}
      <div className="text-center">
        <button className="btn btn-primary">保存</button>
      </div>

      {/* 出欠席一覧 */}
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
          {/* 以下は仮のデータです */}
          <tr>
            <td>2023-10-10</td>
            <td>遅刻</td>
            <td>09:10</td>
            <td>
              <button className="btn btn-danger">削除</button>
            </td>
          </tr>
          {/* 他のデータも同様にこちらにリストします */}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
