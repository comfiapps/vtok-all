# 📂 Models - 데이터엔티티 및 DTO 명세

`vtok_publishing_web` 데이터 모델 객체 정의 디렉토리입니다.

---

## 📄 파일 명세

- **`MintingModel.cs`**:
  - `MittingEntity`: `SitinAddr`/`MittingAddr` 테이블 ORM 엔티티 (`Id`, `Addr`, `Tx_id`, `Value`, `Date`, `Count`, `Round`).
  - `MittingDto`: 클라이언트 승인 요청 DTO (`Addr`, `Tx_id`, `Value`, `Count`, `Round`).
  - `MittingAddr`: 지갑 주소 검증 응답 DTO (`Msg`, `Approvalcount`, `Resultcount`).
- **`WhitelistModel.cs`**: 화이트리스트 주소 DTO.
- **`TimeModels.cs`**: 라운드 시각 DTO (`Round`, `Count`, `Group`, `Approvalcount`).
