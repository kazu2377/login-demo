// checkStringLength.test.js
import {
  checkRequiredFields,
  checkStringLength,
  checkEmailFormat,
} from "../service/ErrorCheckService"; // 実際のファイルのパスを指定してください。
import { MAX_LOGIN_LENGTH, MAX_EMAIL_LENGTH } from "../util/constants";

// ...
describe("checkStringLength", () => {
  // 指定された最大長を超える文字列の場合のチェック
  it("should return error message for string exceeding the allowed length", () => {
    const result = checkStringLength(
      "excessivelyLongLoginName",
      MAX_LOGIN_LENGTH
    );
    expect(result).toBe("10文字以内で入力してください");
  });

  // 指定された最大長内のメールアドレスの場合のチェック
  it("should return null for email within the allowed length", () => {
    const result = checkStringLength("test@email.com", MAX_EMAIL_LENGTH);
    expect(result).toBe(null);
  });

  // 指定された最大長を超えるメールアドレスの場合のチェック
  it("should return error message for email exceeding the allowed length", () => {
    const longEmail =
      "excessivelyLongEmailAddressForTestingPurpose@example.com";
    const result = checkStringLength(longEmail, MAX_EMAIL_LENGTH);
    expect(result).toBe("40文字以内で入力してください");
  });

  describe("checkRequired", () => {
    // 空の文字列の場合の必須チェック
    it("should return an error for empty value", () => {
      expect(checkRequiredFields("")).toBe("必須入力です");
    });

    // 非空の文字列の場合の必須チェック
    it("should return null for non-empty value", () => {
      expect(checkRequiredFields("sample")).toBe(null);
    });
  });

  describe("checkEmailFormat", () => {
    // 有効なメールアドレス形式の場合のチェック
    it("should return null for valid email format", () => {
      expect(checkEmailFormat("test@email.com")).toBe(null);
    });

    // '@'がない無効なメールアドレス形式の場合のチェック
    it("should return an error for invalid email without '@'", () => {
      expect(checkEmailFormat("invalidEmail.com")).toBe(
        "無効なメールアドレス形式です"
      );
    });

    // ドメインがない無効なメールアドレス形式の場合のチェック
    it("should return an error for invalid email without domain", () => {
      expect(checkEmailFormat("invalidEmail@")).toBe(
        "無効なメールアドレス形式です"
      );
    });

    // 複数の'@'がある無効なメールアドレス形式の場合のチェック
    it("should return an error for invalid email with multiple '@'", () => {
      expect(checkEmailFormat("invalid@Email@.com")).toBe(
        "無効なメールアドレス形式です"
      );
    });
  });
});
