# 📂 Service - 비즈니스 서비스 & 백그라운드 타이머 명세

핵심 검증 서비스 및 백그라운드 스케줄러 계층입니다.

---

## 📄 파일 명세

- **`MittingService.cs`**:
  - `IMittingService` 구현체.
  - `Sitin(sitinDto)`: 민팅 시간 검증(`type: 6`), 수량 소진 검증(`type: 1`), 화이트리스트 검증(`type: 3`), 남은 수량 초과 검증(`type: 4`) 비즈니스 로직.
  - `CheckAddr(addr)`: 지갑 주소별 민팅 가능 수량 산출.
  - `Approval(add)`: 민팅 승인 후 Redis 수량 키 갱신.
- **`TimedHostedService.cs`**:
  - `IHostedService` 구현체.
  - 5초 간격 타이머 루프 (`TimeSpan.FromSeconds(5)`).
  - Redis `"MintingTime"` 조회 ➔ `"End"` 시 SignalR 브로드캐스트 후 종료, `"Start"` 시 시각 정보 브로드캐스트.
