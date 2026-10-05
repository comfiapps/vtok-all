# 🚀 VTOK-ALL 통합 프로젝트 (VTOK Platform Monorepo)

> [!IMPORTANT]
> **🤖 AI Agent 및 개발자 안내 지침 (Notice for AI Agents & Developers)**
> - 본 저장소는 VTOK 플랫폼의 프론트엔드, 백엔드 API, 블록체인(NFT/Web3) 연동 서비스 및 학습용 예제가 통합된 모노레포(Monorepo)입니다.
> - **인공지능(AI Agent) 및 개발자는 코드 수정을 직접 수행하는 목적이 아니라면, 코드 전체를 탐색할 필요 없이 본 README와 각 하위 프로젝트/디렉토리의 `README.md` 문서만 참조하여 시스템의 구조 및 역할을 파악하시기 바랍니다.**

---

## 📌 1. 프로젝트 개요 (Overview)

`vtok-all`은 VTOK NFT 서비스 생태계를 구성하는 다양한 컴포넌트들을 통합 관리하는 프로젝트 저장소입니다.  
사용자용 퍼블리싱 웹, 관리자 프론트엔드, NFT 민팅 백엔드 API, 이더리움/클레이튼 스마트 컨트랙트 연동 모듈 및 관련 개발 템플릿이 포함되어 있습니다.

---

## 📂 2. 디렉토리 구조 및 서브 프로젝트 안내

| 디렉토리 명 | 주요 역할 및 기술 스택 | 하위 README |
| :--- | :--- | :---: |
| 🌐 [**vtok_publishing_web**](./vtok_publishing_web) | VTOK 메인 퍼블리싱 웹 (ASP.NET Core + React ClientApp + SignalR + Redis) | [바로가기](./vtok_publishing_web/README.md) |
| 🖥️ [**vtok_admin_frontend**](./vtok_admin_frontend) | VTOK 관리자 백오피스 웹 (React + Material UI DataGrid) | [바로가기](./vtok_admin_frontend/README.md) |
| ⛏️ [**vtok-minting**](./vtok-minting) | VTOK 코어 NFT 민팅 & IPFS 메타데이터 관리 API (ASP.NET Core 6 + Nethereum + MySQL) | [바로가기](./vtok-minting/README.md) |
| 🧪 [**minting-test**](./minting-test) | ERC-721 / ERC-1155 NFT 민팅 테스트 API (ASP.NET Core 6 + Web3) | [바로가기](./minting-test/README.md) |
| ⛓️ [**ethereum-transaction-test**](./ethereum-transaction-test) | 이더리움 잔액 조회 & ERC-20/721 전송 연동 테스트 (React + Web3/Ethers + MetaMask) | [바로가기](./ethereum-transaction-test/README.md) |
| 🦊 [**Metamask-Template**](./Metamask-Template) | React용 메타마스크 지갑 연결 및 체인/계정 변경 이벤트 템플릿 | [바로가기](./Metamask-Template/README.md) |
| 🎮 [**spine-player-test**](./spine-player-test) | Spine 2D 애니메이션 캐릭터 플레이어 웹 렌더링 (React + @esotericsoftware/spine-player) | [바로가기](./spine-player-test/README.md) |
| 📦 [**SandboxClone**](./SandboxClone) | 더 샌드박스 스타일 NFT 마켓플레이스 백엔드 (ASP.NET Core 6 + EF Core) | [바로가기](./SandboxClone/README.md) |
| 💻 [**ASPClone**](./ASPClone) | ASP.NET Core Web API 연습 프로젝트 (CRUD 패턴) | [바로가기](./ASPClone/README.md) |
| 📘 [**CSharpPractice**](./CSharpPractice) | C# 10 / .NET 6 그래프 알고리즘(BFS/DFS) 및 연습 코드 | [바로가기](./CSharpPractice/README.md) |
| 🐹 [**go_practice**](./go_practice) | Go (Golang) 백엔드 입문 예제 | [바로가기](./go_practice/README.md) |
| 🐍 [**python_rest_api_practice**](./python_rest_api_practice) | Python Flask 기반 REST API 및 Producer/Consumer 예제 | [바로가기](./python_rest_api_practice/README.md) |
| 📐 [**Minting.drawio**](./Minting.drawio) | NFT 민팅 시스템 아키텍처 및 순서도 다이어그램 파일 | - |

---

## 🛠️ 3. 기술 스택 요약 (Tech Stack Summary)

- **Backend / API**: C# (.NET 6 / ASP.NET Core Web API), Python (Flask), Go (Golang)
- **Frontend / Client**: React.js, JavaScript (ES6+), HTML5/CSS3, Material-UI (MUI), SignalR Client
- **Blockchain / Web3**: Nethereum (C# Web3 Library), Ethers.js, Web3.js, MetaMask Wallet API, TrustWallet API
- **Database & Storage**: MySQL / MariaDB (EF Core), Redis (캐싱 및 실시간 데이터), IPFS (Decentralized NFT Metadata Storage)
- **Real-time & Animation**: ASP.NET Core SignalR, Spine 2D Web Player

---

## 📑 4. 인수인계 가이드 (Handover Checklist)

새로운 개발자나 관리자가 시스템을 인수인계받을 때 다음 순서로 확인을 권장합니다:

1. **전체 구조 파악**: 각 프로젝트 디렉토리 내의 `README.md` 및 `Minting.drawio` 다이어그램을 확인합니다.
2. **백엔드 환경**: [.NET 6 SDK](https://dotnet.microsoft.com/)가 설치되어 있어야 하며, MySQL 및 Redis 연결 문자열(`appsettings.json`)을 환경에 맞게 수정합니다.
3. **프론트엔드 환경**: [Node.js (v16+)](https://nodejs.org/) 설치 후 해당 React 프로젝트 디렉토리에서 `npm install` 및 `npm start`를 실행합니다.
4. **블록체인 연동**: 이더리움/클레이튼 RPC 엔드포인트 및 스마트 컨트랙트 주소, IPFS API 키 설정을 확인합니다.

---

## 💡 5. AI Agent 참고 사항

AI Agent(Gemini, Antigravity, ChatGPT, Claude 등)는 코드베이스 수정 및 리팩토링 요청을 수행할 때 **각 서브 프로젝트 디렉토리 내부의 `README.md` 문서**를 우선 읽고 모듈 간 의존성을 파악한 뒤 작업을 진행하십시오.
