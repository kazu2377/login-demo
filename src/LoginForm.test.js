import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./LoginForm";
import Dashboard from "./Dashboard";

test("should fill out the login form and navigate", async () => {
  // mock history.push for navigation
  const mockHistoryPush = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

  render(<Login />);
  render(<Dashboard />);

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

  //次の画面に遷移したかどうかの確認
  expect(screen.getByText("受講生の出欠席一覧")).toBeInTheDocument();
});
