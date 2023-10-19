import defaultExport, { bar, foo } from "./candyShop";
jest.mock("./foo-bar-baz", () => {
  const originalModule = jest.requireActual("./foo-bar-baz");

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => "mocked baz"),
    foo: "mocked foo",
  };
});

test("should do a partial mock", () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe("mocked baz");
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe("mocked foo");
  expect(bar()).toBe("bar");
});
// const mockFetchWeather = jest.fn();
// mockFetchWeather.mockReturnValue("雨");

// describe("天気予報アプリ", () => {
//   jest.mock("./fetchWeather", () => ({
//     fetchWeather: jest.fn().mockReturnValue("雨"),
//   }));
//   console.log(fetchWeather());

//   test("今日の天気を取得する", () => {
//     const weather = fetchWeather();
//     console.log(weather);
//     expect(weather).toBe("雨");
//   });
// });

// import { fetchWeather } from "./fetchWeather";

// const myMock = jest.fn();
// console.log(myMock());
// // > undefined

// myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

// console.log(myMock(), myMock(), myMock(), myMock());

// const mockFetchWeather = jest.fn();
// mockFetchWeather.mockReturnValue("雨");

// describe("天気予報アプリ", () => {
//   jest.mock("./fetchWeather", () => ({
//     fetchWeather: jest.fn().mockReturnValue("雨"),
//   }));

//   test("今日の天気を取得する", () => {
//     const weather = fetchWeather();
//     console.log(weather);
//     expect(weather).toBe("雨");
//   });
// });

// // そして、モジュールをインポートします。
// import { fetchWeather } from "./fetchWeather";
// // まず、jest.mock を呼び出します。
// const mockFetchWeather = jest.fn().mockReturnValue("雨");

// jest.mock("./fetchWeather", () => ({
//   fetchWeather: mockFetchWeather,
// }));

// test("今日の天気を取得する", () => {
//   const weather = fetchWeather();
//   console.log(weather);
//   expect(weather).toBe("雨");
// });

// // weatherApp.test.js
// import { fetchWeather } from "./weatherService";

// jest.mock("./weatherService", () => {
//   return {
//     fetchWeather: jest.fn().mockReturnValue("雨"),
//   };
// });

// describe("天気予報アプリ", () => {
//   test("今日の天気を取得する", () => {
//     const weather = fetchWeather();
//     console.log(weather);
//     expect(weather).toBe("雨"); // モックの天気予報サービスなので、"雨"が返ってくるはずです。
//   });
// });

// const forEach = require("./fetchWeather");

// const mockCallback = jest.fn((x) => 42 + x);

// test("forEach mock function", () => {
//   console.log(mockCallback);
//   // forEach([0, 1], mockCallback);
//   // // The mock function was called twice
//   // expect(mockCallback.mock.calls).toHaveLength(2);
//   // // The first argument of the first call to the function was 0
//   // expect(mockCallback.mock.calls[0][0]).toBe(0);
//   // // The first argument of the second call to the function was 1
//   // expect(mockCallback.mock.calls[1][0]).toBe(1);
//   // // The return value of the first call to the function was 42
//   // expect(mockCallback.mock.results[0].value).toBe(42);
// });
