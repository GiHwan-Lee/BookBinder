import * as bookRepository from "../data/bookModel.js";
import * as categoryRepository from "../data/categoryModel.js";

// 모든 패션 상품을 가져오는 함수
export async function getAllBookList(req, res) {
  const data = await bookRepository.getAllBooks();
  res.status(200).json(data);
}

export async function addNewBook(req, res) {
  const {
    CategoryName,
    BookTitle,
    Author,
    PublicationYear,
    Publisher,
    salesQuantity,
    productCount,
  } = req.body;

  let category = await categoryRepository.getCategoryByName(CategoryName);

  if (!category) {
    category = await categoryRepository.createCategory(CategoryName);
  }

  const newBook = await bookRepository.createBook({
    BookTitle,
    Author,
    PublicationYear,
    Publisher,
    salesQuantity,
    productCount,
    categoryId: category.id,
  });

  res.status(201).json(newBook);
}
