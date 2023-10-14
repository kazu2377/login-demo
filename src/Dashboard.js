// Dashboard.js
import React from "react";
import { Container, Button } from "./StyledComponents";

function Dashboard() {
  return (
    <Container>
      {/* 日付部分 */}
      <div style={{ marginBottom: "20px" }}>
        <div>📅 2022年6月</div>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          2022年6月20日
        </div>
      </div>

      {/* ボタン群 */}
      <div style={{ marginBottom: "20px" }}>
        <Button style={{ marginRight: "10px" }}>出勤</Button>
        <Button style={{ marginRight: "10px" }}>退勤/昼戻</Button>
        <Button style={{ marginRight: "10px" }}>休憩</Button>
        <Button>休憩戻</Button>
      </div>

      {/* メモ部分 */}
      <div style={{ marginBottom: "20px" }}>
        <div>📝 メモを追加</div>
        <textarea style={{ width: "100%", height: "100px" }}></textarea>
      </div>

      {/* 保存ボタン */}
      <Button style={{ backgroundColor: "red", width: "100%" }}>保存</Button>
    </Container>
  );
}

export default Dashboard;
