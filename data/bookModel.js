import { db } from "../db/database.js";

export async function getAllBooks() {
  return books;
}

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
