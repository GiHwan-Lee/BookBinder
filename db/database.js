import mysql from "mysql2";
import { config } from "../config.js";

// mysql2 패키지를 사용하여 MySQL 데이터베이스에 연결을 위한 풀(pool) 생성
const pool = mysql.createPool({
  host: config.db.host, // 데이터베이스 호스트
  user: config.db.user, // 사용자 이름
  database: config.db.database, // 사용할 데이터베이스 이름
  password: config.db.password, // 사용자 비밀번호
});

// 비동기로 동작하기 위해 promise의 형태로 export
export const db = pool.promise();

// 카테고리 테이블 생성을 위한 SQL 쿼리문
const createCategoriesTable = `
CREATE TABLE IF NOT EXISTS categories (
  id int NOT NULL AUTO_INCREMENT,
  categoryName varchar(255) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

// 책(books) 테이블 생성을 위한 SQL 쿼리문
const createBooksTable = `
CREATE TABLE IF NOT EXISTS books (
  id int NOT NULL AUTO_INCREMENT,
  bookTitle varchar(255) DEFAULT NULL,
  author varchar(255) DEFAULT NULL,
  publicationYear int DEFAULT NULL,
  publisher varchar(255) DEFAULT NULL,
  salesQuantity int DEFAULT NULL,
  productCount int DEFAULT NULL,
  categoryId int,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  FOREIGN KEY (categoryId) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

// 카테고리와 북 테이블을 생성하는 함수
const createTables = async () => {
  await db.execute(createCategoriesTable);
  console.log("categories tables created successfully.");
  await db.execute(createBooksTable);
  console.log("books tables created successfully.");
};

// 데이터베이스를 초기화 하고 위에서 정의한 createTables 함수를 호출하여 두개의 테이블을 생성하는 함수
export const initializeDatabase = async () => {
  try {
    await createTables();
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error(`Failed to initialize database: ${error.message}`);
    process.exit(1);
  }
};
