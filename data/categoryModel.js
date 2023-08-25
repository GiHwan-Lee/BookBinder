// 상위 계층과 하위 계층 테이블은 각각 별도의 파일로 관리하는 것이 좋다.

import { db } from "../db/database.js";

// 카테고리 이름으로 카테고리를 검색합니다.
// 검색 결과가 있으면 첫 번째 결과를 반환하고, 없으면 null을 반환합니다.
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

// 새로운 카테고리를 생성합니다.
// 생성 후에는 새롭게 추가된 카테고리의 ID와 이름을 반환합니다.
export async function createCategory(categoryName) {
  const [result] = await db.execute(
    "INSERT INTO categories (categoryName) VALUES(?)",
    [categoryName]
  );

  return { id: result.insertId, categoryName }; // insertId와 categoryName을 포함하는 객체를 반환합니다.
}
