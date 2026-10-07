# 📦 DTOs (Data Transfer Objects) - 데이터 전송 객체 명세

클라이언트 요청 검증 및 계층 간 데이터 전달에 사용되는 C# DTO 클래스 정의입니다.

* **`MintDto.cs`**: 민팅 대상 지갑 주소(`contractAddress`), 요청 수량, 메타데이터 URL 및 서명 파라미터.
* **`WhitelistDto.cs`**: 화이트리스트 등록 및 조회를 위한 지갑 주소와 라운드 정보.
* **`TokenDto.cs`**: 온체인 발행 완료된 토큰 식별자(`TokenId`) 및 트랜잭션 영수증 매핑.
