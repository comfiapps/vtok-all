# 📂 Repositories - 데이터 액세스 리포지토리 명세

`ApplicationDbContext`를 활용하여 데이터베이스 테이블에 접근하는 리포지토리 레이어입니다.

---

## 📄 파일 명세

- **`TokenRepository.cs`**: `Insert`, `Delete`, `Reserve` (토큰 예약 및 할당).
- **`ContractRepository.cs`**: `Exists`, `Insert`, `Get` (스마트 컨트랙트 배포 주소 데이터 조작).
- **`WhitelistRepository.cs`**: `Get`, `Insert` (화이트리스트 참가자 정보 접근).
- **`KeyValueRepository.cs`**: `Get`, `Set` (시스템 환경 변수 설정 접근).
