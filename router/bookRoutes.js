import express from "express";
import * as bookController from "../controller/bookController.js";

const router = express.Router();

// 모든 책 상품을 가져오는 엔드포인트.
// 특별하게 구분할 필요가 없기 때문에 라우터 uri는 / 로 설정했다.
router.get("/", bookController.getAllBookList);

router.post("/", bookController.addNewBook);

export default router;
