import * as bookRepository from "../data/bookModel.js";
import * as categoryRepository from "../data/categoryModel.js";

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

// getCategoryByName을 통해 카테고리 이름을 먼저 가져와야 한다.
// 그 이후 만약 DB에 해당 카테고리가 있다면 if를 통해 해당 id를 전달하여 books 테이블에서 categoryId와 조인하여 해당 책들을 가져온다.
export async function getAllByCategory(req, res) {
  const categoryName = req.params.categoryName;
  const category = await categoryRepository.getCategoryByName(categoryName);

  if (category) {
    const data = await bookRepository.getByCategory(category.id);
    res.status(200).json(data);
  } else {
    res.status(404).send("Category not found");
  }
}

export async function getByBookName(req, res) {
  const bookName = req.params.name;
  const data = await bookRepository.getByTitle(bookName);

  res.status(200).json(data);
}

export async function getAllByPublisher(req, res) {
  const publisherName = req.params.name;
  const data = await bookRepository.getByPublisher(publisherName);

  res.status(200).json(data);
}

export async function getTotalSalesByCategory(req, res) {
  const categoryName = req.params.categoryName;
  const category = await categoryRepository.getCategoryByName(categoryName);

  if (category === null) {
    res.status(404).json({ error: "Category not found" });
    return;
  }

  const totalSales = await bookRepository.getTotalSalesByCategoryId(
    category.id
  );
  res.status(200).json({ totalSales });
}

export async function getTotalStockByCategory(req, res) {
  const categoryName = req.params.categoryName;

  const category = await categoryRepository.getCategoryByName(categoryName);

  if (category === null) {
    res.status(404).json({ error: "Category not found" });
    return;
  }

  const totalStock = await bookRepository.getTotalStockByCategoryId(
    category.id
  );

  if (totalStock === null) {
    res.status(404).json({ error: "No books found for this category" });
    return;
  }

  res.status(200).json({ totalStock });
}

export async function getTopBooks(req, res) {
  const data = await bookRepository.getTopThree();

  res.status(200).json(data);
}
