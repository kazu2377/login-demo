import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("12:00");

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">出席管理ダッシュボード</h2>

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
    </div>
  );
};

export default Dashboard;
