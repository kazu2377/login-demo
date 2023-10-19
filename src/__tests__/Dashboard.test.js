const addNumbers = require("./calc");

test("One plus two should be 3", () => {
  expect(addNumbers(1, 2)).toBe(3);
});

// fetchData.test.js
// import { fetchStudentData } from "./serves/fetchData";
// import * as supabaseModule from "../supabaseClient"; // Supabase clientのインポートを変更

// jest.mock("./supabaseClient", () => ({
//   // モックの戻り値を明示的に定義
//   supabase: {},
// }));

// describe("fetchStudentData", () => {
//   afterEach(() => {
//     jest.clearAllMocks(); // 各テストの後でモックをクリア
//   });

//   it("should fetch student data successfully", async () => {
//     const mockData = {
//       student_id: "12345",
//       attendance_records: [
//         {
//           record_id: "rec1",
//           date: "2023-01-01",
//           status: "Present",
//           time: "09:00 AM",
//         },
//       ],
//     };

//     const mockData2 = {
//       student_id: "12345",
//       attendance_records: [
//         {
//           record_id: "rec1",
//           date: "2023-01-01",
//           status: "Present",
//           time: "09:00 AM",
//         },
//       ],
//     };

//     supabaseModule.supabase.from = jest.fn().mockReturnValue({
//       select: jest.fn().mockReturnThis(),
//       eq: jest.fn().mockReturnThis(),
//       filter: jest
//         .fn()
//         .mockReturnValue(Promise.resolve({ data: [mockData], error: null })),
//     });

//     const result = await fetchStudentData("12345");
//     expect(result).toEqual([mockData2]);
//     expect(supabaseModule.supabase.from).toHaveBeenCalledWith("students");
//   });

//   // ... 他のテストケース
// });
