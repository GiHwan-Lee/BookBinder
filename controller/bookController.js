import * as bookRepository from "../data/bookModel.js";

// 모든 패션 상품을 가져오는 함수
export async function getAllBookList(req, res) {
  const data = await bookRepository.getAllBooks();
  res.status(200).json(data);
}
