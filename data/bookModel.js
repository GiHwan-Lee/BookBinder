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
  bookTitle,
  author,
  publicationYear,
  publisher,
  salesQuantity,
  productCount,
  categoryId,
}) {
  const sql = `
    INSERT INTO books
      (bookTitle, author, publicationYear, publisher, salesQuantity, productCount, categoryId)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await db.execute(sql, [
    bookTitle,
    author,
    publicationYear,
    publisher,
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
  const result = await db.execute("SELECT * FROM books WHERE bookTitle = ?", [
    bookName,
  ]);

  return result[0];
}

export async function getByPublisher(publisherName) {
  const count = await db.execute(
    "SELECT COUNT(*) as total FROM books WHERE publisher = ?",
    [publisherName]
  );
  const result = await db.execute("SELECT * FROM books WHERE publisher = ?", [
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
    SELECT SUM(salesQuantity) as totalSales
    FROM books
    WHERE categoryId = ?
    `,
    [categoryId]
  );
  return rows.length ? rows[0].totalSales : null;
}

export async function getTotalStockByCategoryId(categoryId) {
  const [rows] = await db.execute(
    `
    SELECT SUM(productCount) as totalStock 
    FROM books 
    WHERE categoryId = ?
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

export async function updateSalesQuantity(bookName, publicationYear, newSales) {
  const [result] = await db.execute(
    `
    UPDATE books 
    SET salesQuantity = ? 
    WHERE bookTitle = ? AND publicationYear = ?
    `,
    [newSales, bookName, publicationYear]
  );

  return result.affectedRows > 0;
  // 실제로 하나 이상의 행이 변경되었을 때만 true가 되어 return을 하도록 만들기 위해 생성한 코드
  // 즉 잘 수정이 되었을 때만 return이 된다.
}

export async function updateProductCount(bookName, publicationYear, newStock) {
  const [result] = await db.execute(
    `
    UPDATE books 
    SET productCount = ? 
    WHERE bookTitle = ? AND publicationYear = ?
    `,
    [newStock, bookName, publicationYear]
  );

  return result.affectedRows > 0;
}

export async function deleteBookByTitleAndYear(bookName, publicationYear) {
  const result = await db.execute(
    `
    DELETE FROM books 
    WHERE bookTitle = ? AND publicationYear = ?
    `,
    [bookName, publicationYear]
  );
  return result[0].affectedRows > 0;
}
