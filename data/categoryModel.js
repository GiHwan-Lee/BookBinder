import { db } from "../db/database.js";
// 상위 계층과 하위 계층 테이블은 각각 별도의 파일로 관리하는 것이 좋다.

export async function getCategoryByName(categoryName) {
  const [rows, fields] = await db.execute(
    "SELECT * FROM categories WHERE categoryName = ?",
    [categoryName]
  );

  if (rows.length > 0) {
    return rows[0]; // 가장 첫 번째 row를 반환합니다.
  }

  return null;
}

export async function createCategory(categoryName) {
  const [result] = await db.execute(
    "INSERT INTO categories (categoryName) VALUES(?)",
    [categoryName]
  );

  return { id: result.insertId, categoryName }; // insertId와 categoryName을 포함하는 객체를 반환합니다.
}
