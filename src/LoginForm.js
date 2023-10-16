import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Users from "./Users";

import {
  checkRequiredFields,
  checkEmailFormat,
  authenticateUser,
} from "./ErrorCheckService";
import {
  Container,
  Title,
  Input,
  Button,
  FooterText,
} from "./StyledComponents";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    // async を追加
    e.preventDefault();

    // 必須入力チェック
    const requiredError = checkRequiredFields([username, password]);
    if (requiredError) {
      setError(requiredError);
      return;
    }

    // 形式チェック（メールアドレス形式のみを想定）
    const emailError = checkEmailFormat(username);
    if (emailError) {
      setError(emailError);
      return;
    }

    // 認証エラーチェック（サンプル）
    const isAuthenticated = await authenticateUser(username, password); // await を追加
    if (!isAuthenticated) {
      setError("ログイン情報が正しくありません。"); // エラーメッセージをセット
      return;
    }

    setIsLoggedIn(true); // 認証成功時、isLoggedInをtrueに設定
  };

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <Container>
      <Title>サンプルHp</Title>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Input
        type="text"
        value={username}
        placeholder="ログインID"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        placeholder="パスワード"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>ログイン</Button>
      <FooterText>
        Copyright © sole color design Co., Ltd. All Rights Reserved.
      </FooterText>

      {/* Usersコンポーネントをこの位置に残すかは、要件に応じて調整してください */}
      <Users />
    </Container>
  );
}

export default LoginForm;
