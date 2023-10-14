import React from "react";
import LoginForm from "./LoginForm";

function App() {
  const handleLogin = (username, password) => {
    // ここでAPIを呼び出してログイン処理を行うことも可能
    // 簡単なデモのため、コンソールに出力するだけにしています
    console.log("Trying to log in with", username, password);
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default App;
