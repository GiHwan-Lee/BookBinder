import { db } from "../db/database.js";

// 모든 카테고리의 책들을 가져오기
export async function getAllBooks() {
  const count = await db.execute("SELECT COUNT(*) as total FROM books");
  const products = await db.execute("SELECT * FROM books");

  return {
    total: count[0][0].total,
    products: products[0],
  };
}

// 새로운 책 입고시 추가하기
export async function createBook({
  BookTitle,
  Author,
  PublicationYear,
  Publisher,
  salesQuantity,
  productCount,
  categoryId,
}) {
  const sql = `
    INSERT INTO books
      (BookTitle, Author, PublicationYear, Publisher, salesQuantity, productCount, categoryId)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await db.execute(sql, [
    BookTitle,
    Author,
    PublicationYear,
    Publisher,
    salesQuantity,
    productCount,
    categoryId,
  ]);

  return result[0].insertId;
}

export async function getByCategory(categoryId) {
  // 책들의 수를 세는 쿼리
  const [countResult] = await db.execute(
    `
    SELECT COUNT(*) AS total 
    FROM books
    INNER JOIN categories ON books.categoryId = categories.id
    WHERE categories.id = ?
    `,
    [categoryId]
  );

  // 책들의 정보를 가져오는 쿼리
  const [rows] = await db.execute(
    `
    SELECT * 
    FROM books
    INNER JOIN categories ON books.categoryId = categories.id
    WHERE categories.id = ?
    `,
    [categoryId]
  );

  return {
    total: countResult[0].total,
    books: rows,
  };
}

export async function getByTitle(bookName) {
  const result = await db.execute("SELECT * FROM books WHERE BookTitle = ?", [
    bookName,
  ]);

  return result[0];
}

export async function getByPublisher(publisherName) {
  const count = await db.execute(
    "SELECT COUNT(*) as total FROM books WHERE Publisher = ?",
    [publisherName]
  );
  const result = await db.execute("SELECT * FROM books WHERE Publisher = ?", [
    publisherName,
  ]);

  return {
    total: count[0][0].total,
    books: result[0],
  };
}

export async function getTotalSalesByCategoryId(categoryId) {
  const [rows] = await db.execute(
    `
    SELECT SUM(salesQuantity) as TotalSales
    FROM books
    WHERE categoryId = ?
    `,
    [categoryId]
  );
  return rows.length ? rows[0].TotalSales : null;
}

export async function getTotalStockByCategoryId(categoryId) {
  const [rows] = await db.execute(
    `
    SELECT SUM(productCount) as totalStock 
    FROM books 
    WHERE CategoryId = ?
    `,
    [categoryId]
  );

  if (rows.length > 0) {
    return rows[0].totalStock;
  }

  return null;
}

export async function getTopThree() {
  const [rows] = await db.execute(
    `
    SELECT * 
    FROM books 
    ORDER BY salesQuantity DESC
    LIMIT 3
    `
  );

  return rows;
}
