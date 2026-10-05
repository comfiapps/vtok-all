# 📂 Data - Database Context 명세

`vtok_publishing_web` 프로젝트의 Entity Framework Core 데이터베이스 연결 컨텍스트 계층입니다.

---

## 📄 파일 명세

- **`ApiDataContext.cs`**:
  - `DbContext` 상속 MySQL 매핑 클래스.
  - `DbSet<SitinEntity> SitinEntity` ➔ MySQL `SitinAddr` 테이블 매핑.
  - `DbSet<MittingEntity> MittingEntity` ➔ MySQL `MittingAddr` 테이블 매핑.
  - `OnConfiguring`: `appsettings.json` 내 `ConnectionStrings:DbContext` 항목 로드 후 `ServerVersion.AutoDetect` 자동 감지 연결.
