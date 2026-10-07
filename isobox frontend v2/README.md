# 🎨 iSOBOX Frontend v2 (차세대 전면 리팩터링 프론트엔드 클라이언트)

iSOBOX 메타버스 플랫폼의 UI/UX 개편 및 글로벌 다국어 지원을 위해 컴포넌트 아키텍처를 전면 모듈화하여 재설계한 **2세대 프론트엔드 프로젝트**입니다.

---

## 🚀 v1 대비 주요 변경점 및 신규 아키텍처

1. **다국어(i18n) 시스템 도입**:
   * `src/res/lang/la-ko.js` (한국어) 및 `src/res/lang/la-en.js` (영어) 리소스 분리 및 동적 언어 전환 지원
2. **콘텐츠 계층(Contents Layer) 모듈화**:
   * 기존 모놀리식 페이지 구조를 `src/layouts/Contents/` 하위 모듈(`Overview`, `Avatar`, `Story`, `NFTInIsobox`, `ServiceTabs`, `Roadmap`, `Partner`)로 완전 분리
3. **팀/어드바이저 체계 확장**:
   * `MainMember`, `KeyMember`, `Advisor` 등 역할별 팀원 카드 컴포넌트 세분화
4. **소셜 채널 연동 컴포넌트**:
   * Discord, Twitter, Telegram, Kakao 공식 SNS 연동 전용 아이콘 및 버튼 그룹(`SocialMediaButtonGroup`) 탑재
5. **타이포그래피 및 비주얼 테마 강화**:
   * `SpecialTypography` 컴포넌트 및 신규 일러스트 애셋(`housing.png`, `trade.png`, `creation.png`, `community.png`) 적용

---

## 🛠️ 실행 방법

```bash
cd ClientApp
npm install --legacy-peer-deps
npm start
```
* 기본 구동 포트: `http://localhost:3000` (또는 `PORT=3002`)
