## 1. 프로젝트 개요

React.js, TypeScript, React Query, TailwindCSS를 활용한 도서 검색 웹 애플리케이션입니다. 카카오 도서 API를 통해 검색 기능을 제공하며, 관심 도서를 찜 목록에 저장할 수 있는 기능을 포함합니다.

## 2. 환경설정 및 실행 방법

### 2-1. 환경설정

1. 루트디렉토리에 `.env` 파일 생성 후 `VITE_KAKAO_API_KEY`, `VITE_KAKAO_API_URL`를 입력해 주세요.

2. Node.js 버전

- `v20.9` 이상 권장
- `v20.9.0`으로 개발/테스트하였습니다.

3. IDE typescript 설정

- `Workspace Version`을 권장합니다.
- VS Code 기준, [Command Palette]> [Select TypeScript Version] > [Use Workspace Version]

### 2-2. 실행 방법

- 운영환경

  ```bash
  yarn install
  yarn build
  yarn start
  ```

  `http://localhost:3000`

- 개발환경

  ```bash
  yarn install
  yarn dev
  ```

  `http://localhost:5173`

## 3. 폴더 구조 및 주요 코드 설명

### 3-1. 폴더 구조

```
.
├── app
│   ├── app.css                       // TailwindCSS 기반 전역 스타일 및 디자인 시스템 정의
│   ├── components                    // UI 컴포넌트 모음
│   ├── features
│   │   └── book                      // 도서 목록 관련 API, type, hook(react-query)
│   ├── lib
│   │   ├── config.ts                 // 환경변수 관련 설정
│   │   ├── constants.ts              // 프로젝트 전역에 사용될 상수 정의
│   │   ├── hooks.ts                  // 커스텀 훅 정의
│   │   └── utils.ts                  // 유틸 함수 정의
│   ├── root.tsx                      // 공통 레이아웃, 메타/링크, 에러 바운더리, React Query 설정
│   ├── routes
│   │   ├── search.tsx                // 검색 페이지
│   │   └── wishlist.tsx              // 찜 목록 페이지
│   └── routes.ts                     // 라우팅 경로 설정
├── public                            // 정적 이미지 애셋
├── package.json
├── README.md
├── react-router.config.ts            // React Router 설정 파일
├── tsconfig.json                     // TypeScript 설정
├── vite.config.ts                    // Vite 번들러 설정
└── yarn.lock
```

### 3-2. 주요 코드 설명

- **라우팅**

  - `app/routes.ts`에서 전체 라우팅 경로를 정의하며, `'/'`, `'/wishlist'` 경로에 각각 `search.tsx`, `wishlist.tsx` 컴포넌트를 연결합니다.

- **페이지 구조**

  - `search.tsx`, `wishlist.tsx`는 `PageLayout`을 공유하며, `features/book/hooks.ts`에 커스텀훅으로 정의된 데이터 페칭 로직을 사용합니다.

- **BookList 컴포넌트**
  - 도서 리스트를 렌더링하며, 로컬스토리지에 저장된 찜한 도서 목록을 `Set`로 변환 후 찜한 도서 여부를 확인합니다(Array.includes(id) 대신 Set.has(id)를 사용하여 연산 비용을 줄임).

## 4. 라이브러리 선택 이유

- **React router + Vite**

  - 빠른 개발 환경과 직관적인 파일 기반 라우팅 지원
  - React 공식 문서에서도 Next.js 다음 순서로 추천되는 앱 구조

- **TailwindCSS(+tailwind-merge)**
  - 디자인 시스템 통합과 커스터마이징에 용이
  - Vite와의 원활한 통합

## 5. 강조하고 싶은 기능

- **🔄 무한 스크롤**

  - ReactQuery의 `useInfiniteQuery` 사용
  - 검색/찜 목록 데이터 구조 공통화

- **🪗 도서정보 아코디언**

  - 아코디언 애니메이션 적용

- **✨ 검색창 외부 클릭 시 닫힘**

  - 커스텀 훅 사용하여, 검색창/상세검색창 활성화 시 외부 요소 클릭하면 닫히도록 처리

- **🎨 아이콘 컴포넌트화**
  - 클래스네임으로 아이콘 색상/크기 커스텀할 수 있도록 컴포넌트 설계
