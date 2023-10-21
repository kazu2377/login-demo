import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../LoginForm";

test("should fill out the login form and navigate", async () => {
  render(<Login />);
  // render(<Dashboard />);

  // IDとパスワードの入力フィールドを取得
  // const idInput = screen.getByLabelText(/ID/i);
  const idInput = screen.getByPlaceholderText("ログインID");

  // const passwordInput = screen.getByLabelText(/Password/i);
  const passwordInput = screen.getByPlaceholderText("パスワード");

  // ユーザイベントを使用してIDとパスワードを入力
  userEvent.type(idInput, "login01@test.co.jp");
  userEvent.type(passwordInput, "hash01");

  // ログインボタンをクリック
  const loginButton = screen.getByText(/ログイン/i);
  userEvent.click(loginButton);

  //なぜかｐｃにより通らない場合があるのでエラーが出るならコメントしておく
  await waitFor(() => {
    //次の画面に遷移したかどうかの確認
    expect(screen.getByText("遅刻")).toBeInTheDocument();
  });
  // ボタンを取得
  const button = screen.getByText("遅刻");
  console.log(button);
  // ボタンをクリック
  fireEvent.click(button);

  // クリック後の期待される動作を検証
  expect(screen.getByText("遅刻")).toBeInTheDocument();
});
