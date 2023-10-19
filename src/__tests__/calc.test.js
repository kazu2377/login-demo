const addNumbers = require("./calc");

test("One plus two should be 3", () => {
  expect(addNumbers(1, 2)).toBe(3);
});
