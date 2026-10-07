# 🎨 iSOBOX Frontend v1 (React 17 기반 iSOBOX 초기 퍼블리싱 클라이언트)

VTOK 플랫폼의 1세대 메인 웹사이트 및 NFT 민팅 포털 프론트엔드 프로젝트입니다.
현재 루트 디렉토리의 [`vtok_publishing_web/ClientApp`](../vtok_publishing_web/ClientApp)에 탑재되어 실서비스 환경으로 구동되는 버전의 독립 복사본입니다.

---

## 📐 주요 기술 스택 & 컴포넌트

* **프레임워크**: React 17.0.2 SPA
* **스타일링 & UI**: Material-UI (MUI v5), Emotion Styled, Swiper 7
* **Web3 / 블록체인**: Klaytn (Kaikas Wallet `window.klaytn` 연동), Google reCAPTCHA v2/v3
* **핵심 컴포넌트**:
  * `MintBox`: 실시간 민팅 수량 조회, 카운트다운 타이머 및 Kaikas 온체인 서명 트랜잭션 전송
  * `HousePreview`: 반응형 3D 가상 공간 및 아바타 미리보기
  * `ServiceTabs`: Trade, Creation, Housing, Community 메타버스 4대 서비스 인터랙티브 슬라이드

---

## 🛠️ 실행 방법

```bash
cd ClientApp
npm install --legacy-peer-deps
npm start
```
* 기본 구동 포트: `http://localhost:3000` (또는 `PORT=3001`)
