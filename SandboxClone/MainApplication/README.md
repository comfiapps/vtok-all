# 📂 SandboxClone - `MainApplication` API 및 도메인 모델 명세

`SandboxClone` 백엔드 프로젝트의 도메인 모델 관계 및 API 컨트롤러 명세입니다.

---

## 🗄️ 도메인 엔티티 관계 (Domain Models)

- **`NFTGroup`**: NFT의 컬렉션/카테고리 정보 (그룹명, 대표 이미지, 작성자).
- **`NFT`**: 낱개 복셀/3D asset NFT 정보 (토큰 ID, 메타데이터, 가격, 소유자).
- **`CartItem`**: 특정 유저의 장바구니에 담긴 NFT 및 수량.
- **`User`**: 지갑 주소, 사용자 닉네임, 프로필 정보.

---

## 🔌 API 컨트롤러 명세 (Controllers)

### 1. `NFTGroupController`
- `GET /api/NFTGroup`: NFT 그룹/컬렉션 카탈로그 목록 조회.
- `POST /api/NFTGroup`: 신규 NFT 그룹 생성.

### 2. `NFTController`
- `GET /api/NFT/{id}`: 특정 NFT 아이템의 메타데이터 및 가격 조회.
- `POST /api/NFT`: 신규 NFT 등록.

### 3. `CartController`
- `GET /api/Cart/{userId}`: 유저의 장바구니 목록 조회.
- `POST /api/Cart`: 장바구니 항목 추가/수량 변경.
- `DELETE /api/Cart/{itemId}`: 장바구니 항목 삭제.

### 4. `UserController`
- `GET /api/User/{walletAddress}`: 지갑 주소 기반 유저 프로필 조회.
- `POST /api/User`: 유저 신규 가입/등록.
