import React, { useState } from "react";
import Dashboard from "./Dashboard";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Login with:", username, password);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true); // これを追加
  };

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <Container>
      <Title>サンプルHp</Title>
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
    </Container>
  );
}

export default LoginForm;
