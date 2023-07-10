# 프로젝트 이름

Book Binder application

# 프로젝트 소개

도서 관리자를 위한 도서 관리 애플리케이션 입니다. 해당 애플리케이션을 통해 현재 보유 중인 책들을 관리할 수 있으며, 새로 입고 된 책들을 추가할 수 있고, 수정되어야 할 정보들이 있다면 수정이 가능하고, 더 이상 존재하지 않는 책들은 제거할 수 있습니다.

현재 책의 종류를 구분하는 가장 큰 카테고리로는 인문학(Humanities), 자연과학(Natural Sciences), 역사 (History), 픽션 (Fiction)이 존재하는데, 향후에 다양한 책이 추가됨으로써 큰 카테고리 또한 다양해 질 것을 염두하여 테이블 구조를 계층적 테이블 구조로 구성하였습니다. 계층적으로 테이블을 구성함으로써 큰 카테고리가 추가 될 때마다 번거롭게 새로운 테이블을 수동적으로 생성 할 필요 없도록 하였습니다.

정리하자면, 해당 어플리케이션을 통해 도서 관리자는 다음과 같은 효과를 얻을 수 있습니다.

-효율성: 도서 정보 불러오기, 추가, 삭제, 수정 등의 작업을 한 곳에서 할 수 있어 작업 효율성이 향상됩니다.

-시간 절약: 간편한 검색 기능을 통해 일정한 조건에 해당하는 책 정보를 빠르게 찾을 수 있습니다. 이는 도서 관리에 소요되는 시간을 크게 줄여줍니다.

-유지보수성: 새로운 카테고리가 생성될 때마다 번거롭게 테이블을 수동적으로 생성할 필요가 없습니다.

(현재 DB의 테이블 구조는 계층적 테이블 구조를 이루고 있기 때문에, 큰 카테고리 항목이 추가될 때마다 번거롭게 테이블을 수동적으로 생성 할 필요 없이, 카테고리 이름을 입력하면 상위 테이블에 해당 카테고리의 레코드가 생성이 되고 이 레코드를 기반으로 하위 테이블에서는 그 카테고리 범주에 해당되는 책의 정보들이 들어가게 됩니다.)

# 프로젝트 실행 방법

1. 환경 설정: 먼저 .env 파일에 필요한 환경 변수들을 설정해야 합니다. 여기서 <Your Password>는 실제 MySQL 비밀번호로 교체해야 합니다.

2. 서버 실행: 먼저 프로젝트 루트 폴더에서 server 폴더로 이동합니다. 이동한 후에 npm start 명령어를 입력하면 서버가 시작되고 데이터베이스와의 연결이 초기화됩니다.

```bash

cd server
npm start

```

3. API 테스트: 서버가 정상적으로 실행되면 Postman과 같은 API 테스트 도구를 사용해서 각 API의 동작을 확인할 수 있습니다. 이 테스트는 서버가 클라이언트의 요청을 올바르게 처리하고 응답하는지를 확인할 수 있습니다. API 관련 문서는 아래의 '더 알아보기'를 참고해주세요.

> 참고: 이 프로젝트를 실행하기 위해서는 Node.js가 설치되어 있어야 합니다. 또한, 프로젝트를 처음 실행하는 경우 npm install 명령어를 통해 필요한 패키지들을 설치해야 합니다.

# 프로젝트 구조 및 파일 설명

## 1. 디렉토리 구조

- `/server` : 서버 애플리케이션 코드가 있는 디렉토리입니다.

## 2. 서버 디렉토리 구조

서버의 코드는 MVC 패턴에 따라 구조화되어 있습니다.

- `/server`
  - `app.js`: 서버 애플리케이션의 진입점입니다. 서버를 시작하고, 필요한 미들웨어를 설정하며, 라우트를 설정합니다.
  - `config.js`: 환경 변수 및 설정 값들을 관리하는 파일입니다.
  - `.env`: 비공개 환경 변수를 저장하는 파일입니다. 이 파일은 git에 올리지 않아야 합니다.
  - `.gitignore`: git이 추적하지 않아야 하는 파일 및 디렉토리를 명시하는 파일입니다.
  - `package.json`: 프로젝트에 대한 메타데이터와 사용하는 패키지를 나열하는 파일입니다.
  - `/controller`
    - `product.js`: 책 관련 요청 처리 로직이 구현된 컨트롤러 파일입니다.
  - `/data`
    - `product.js`: 책 데이터에 대한 모델 파일입니다. 이 파일은 데이터베이스에서 책의 데이터를 조회하거나 저장하는 데 사용됩니다.
  - `/db`
    - `database.js`: 데이터베이스 연결 및 초기화 관련 코드가 있는 파일입니다.
  - `/router`
    - `product.js`: 책 관련 라우팅을 관리하는 파일입니다. 이 파일은 책 관련 요청을 적절한 컨트롤러 메서드에 연결합니다.

# 기술 스택

## 서버

- Node.js: 서버 사이드 JavaScript 실행 환경
- Express.js: 웹 애플리케이션 프레임워크
- MySQL: 관계형 데이터베이스 시스템
- dotenv: 환경 변수를 .env 파일에서 프로세스의 환경 변수로 로드
- express-async-errors: Express 라우트와 미들웨어 내에서 비동기 오류를 처리
- Helmet: HTTP 헤더 설정을 통해 애플리케이션 보안을 강화하는 미들웨어
- Morgan: HTTP 요청 로거 미들웨어
- CORS: Cross-Origin Resource Sharing (CORS)을 가능하게 하는 미들웨어
- Nodemon: Node.js 애플리케이션의 개발을 단순화하는 도구 (개발 모드로 설치)

# Base URL

모든 API 요청은 다음 base URL을 사용합니다: `http://localhost:3000`.

# API 개요

## 1. 모든 책들을 가져오기

- `GET /books`: 데이터베이스의 모든 책들의 정보와 총 개수를 가져옵니다.
- 주의: 데이터베이스는 초기에 비어 있습니다. 이 API를 사용하기 전에 POST 요청을 통해 상품을 먼저 추가해야 합니다. 상세한 방법은 '번 패션 상품 추가하기 API'를 참조해주세요.

## 2. 특정 카테고리별로 이에 해당하는 모든 책들을 가져오기

- `GET /books/category/:categoryName`: 데이터베이스에 존재하는 카테고리별로 모든 책들의 정보와 총 개수를 가져옵니다.
- 주의: 데이터베이스는 초기에 비어 있습니다. 이 API를 사용하기 전에 POST 요청을 통해 상품을 먼저 추가해야 합니다. 상세한 방법은 '번 화장품 상품 추가하기 API'를 참조해주세요.

## 3. 책 이름을 통해 해당 책의 정보 가져오기

- `GET /books/bookName/:name`: 데이터베이스에서 특정 책에 대한 정보를 가져옵니다.
- 주의: 데이터베이스는 초기에 비어 있습니다. 이 API를 사용하기 전에 POST 요청을 통해 상품을 먼저 추가해야 합니다. 상세한 방법은 '번 폰케이스 상품 추가하기 API'를 참조해주세요.

## 4. 출판사 별로 책들의 정보 불러오기

- `GET /books/publisher/:name`: 특정 출판사의 모든 책 정보와 총 개수를 가져옵니다.

## 5. 특정 카테고리별 총 판매량 가져오기

- `GET /books/sales/:categoryName`: 특정 카테고리에 해당하는 모든 책들의 총 판매량을 가져옵니다.

## 6. 특정 카테고리별 총 재고 수량 가져오기

- `GET /books/totalStock/:categoryName`: 특정 카테고리에 해당하는 모든 책들의 총 재고 수량을 가져옵니다.

## 7. 판매량 상위 3개 책들을 가져오기

- `GET /books/bestsellers`: 모든 책들을 통틀어서 가장 판매량이 높은 상위 3개의 책들의 정보를 가져옵니다.

## 8. 책 정보 추가하기

- `POST /books`: 데이터베이스에 책의 정보를 추가합니다.

## 9. 특정 책의 판매량 수정하기

- `PUT /books/updateSales/:bookName/:publicationYear`: 데이베이스에 있는 특정 책의 판매량을 수정합니다.

## 10. 특정 책의 재고 수량 수정하기

- `PUT /books/updateStock/:bookName/:publicationYear`: 데이베이스에 있는 특정 책의 재고 수량을 수정합니다.

## 11. 특정 책의 정보를 삭제하기

- `PUT /books/delete/:bookName/:publicationYear`: 데이베이스에 있는 특정 책의 정보를 삭제합니다.

## 더 알아보기

더 자세한 API 정보는 [https://documenter.getpostman.com/view/24146598/2s93si2AVd]의 Postman API 문서를 참고해주세요.
