# 📂 Repository - 데이터 액세스 레이어 명세

데이터베이스 및 Redis 캐시 조작 레이어입니다.

---

## 📄 파일 명세

- **`MittingRepository.cs`**:
  - `ApiDataContext`를 사용하여 DB CRUD 수행.
  - `Sitin(addr)`: 대기열 등록.
  - `CheckWhitelist(addr)`: 화이트리스트 주소 유효성 검사.
  - `CheckAddr(round, addr)`: 해당 라운드에서 사용자가 이미 민팅한 수량 조회.
  - `Approval(dto)`: 승인된 민팅 엔티티 DB 삽입.
- **`RedisRepository.cs`**:
  - Redis 키 조작 (`"Mitting" + round`, `"MintingTime"`).
  - `GetTime()`, `SetMintingTime()`, `GetKey(key)`, `SetKey(key, value)`.
