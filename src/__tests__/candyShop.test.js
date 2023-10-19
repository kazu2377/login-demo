// candyShop.test.js ファイル
const sellCandy = require("./candyShop");
const mockSellCandy = jest.fn(sellCandy);

test("should sell candy", () => {
  mockSellCandy("Chocolate");
  expect(mockSellCandy).toHaveBeenCalledWith("Chocolate");
  expect(mockSellCandy).toHaveBeenCalledTimes(1);
});
