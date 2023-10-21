// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// import App_test from "../App_test";
import Search from "../Search";

describe("Search", () => {
  test("calls the onChange callback handler", async () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    await userEvent.type(screen.getByRole("textbox"), "JavaScript");
    // await userEvent.type(screen.getByRole("textbox"), "toukyou");

    expect(onChange).toHaveBeenCalledTimes(10);
    // const onChange = jest.fn();
    // const onChange = jest.fn();

    // render(
    //   <Search value="" onChange={onChange}>
    //     Search:
    //   </Search>
    // );

    // // IDを使って<input>要素を取得
    // await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    // expect(onChange).toHaveBeenCalledTimes(10);
    // screen.debug();

    // await userEvent.type(screen.getByTestId("search"), "HelloWorld");
    // console.log("aaaaaaaaaaaaaaaa");
    // screen.debug();

    // expect(screen.getByTestId("search")).toHaveValue("HelloWorld");

    // 入力操作

    // 必要なアサーション（例: 入力内容の確認）
    // expect(inputElement.value).toBe("HelloWorld");
  });

  // test("renders learn react link", async () => {
  //   render(<App_test />);

  //   // fails
  //   // expect(screen.getByText(/Searches for JavaScript/)).toBeNull();
  //   // expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  //   // screen.debug();

  //   // wait for the user to resolve
  //   // needs only be used in our special case

  //   //非同期で先にすすまないようにまってくれている
  //   screen.debug();

  //   await screen.findByText(/Signed in as/);
  //   screen.debug();

  //   expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

  //   await userEvent.type(screen.getByRole("textbox"), "JavaScript");

  //   expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();

  //   // const linkElement = screen.getByText(/ログイン/i);
  //   // expect(linkElement).toBeInTheDocument();
  // });
});
