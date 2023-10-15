export const checkRequiredFields = (fields) => {
  for (let field of fields) {
    if (field === "") return "必須入力です";
  }
  return null;
};

export const checkEmailFormat = (email) => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailPattern.test(email)) return "無効なメールアドレス形式です";
  return null;
};

export const authenticateUser = (username, password) => {
  // ここでAPIとの連携を行う予定。
  // サンプルとして、仮のユーザー名とパスワードを設定します。
  if (username !== "sample@example.com" || password !== "sample123") {
    return "IDまたはパスワードが間違っています";
  }
  return null;
};
