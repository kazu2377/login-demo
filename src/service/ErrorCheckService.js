import supabase from "../supabaseClient";
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

// export const authenticateUser = (username, password) => {
//   // ここでAPIとの連携を行う予定。
//   // サンプルとして、仮のユーザー名とパスワードを設定します。
//   if (username !== "sample@example.com" || password !== "sample123") {
//     // return "IDまたはパスワードが間違っています";
//     return false;
//   }
//   return true;
// };

export const authenticateUser = async (username, password) => {
  // テーブルから、入力されたユーザー名（メールアドレス）とパスワードに一致するデータを検索する
  const { data, error } = await supabase
    .from("students")
    .select("student_id, login_id, password_hash")
    .eq("login_id", username)
    .eq("password_hash", password) // 入力されたユーザー名と一致するデータを検索
    // 実際のデータベース設計に応じて、パスワードもチェックするための処理を追加する必要があるかもしれません
    .limit(1);

  if (error) {
    console.error("Error during authentication:", error);
    return false;
  }

  // データが存在しない、または複数のデータが見つかった場合、認証は失敗とみなします。
  if (!data || data.length !== 1) {
    console.error(
      "データが存在しない、または複数のデータが見つかった場合、認証は失敗とみなします。:",
      error
    );

    return null;
  }

  // データが正確に1つ見つかった場合、認証は成功とみなします。
  // console.error(
  //   "データが正確に1つ見つかった場合、認証は成功とみなします。:",
  //   error
  // );

  return data[0].student_id;
};
