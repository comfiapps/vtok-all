# 🎮 Spine Player Test (Spine 2D 캐릭터 플레이어 웹 테스트)

Esoteric Software의 2D 캐릭터 스파인 애니메이션 자원(.json, .atlas, .png)을 WebGL Canvas 상에서 인터랙티브하게 렌더링하고 애니메이션 스킨/모션을 테스트하는 React 웹 어플리케이션입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React.js 17+
- **Animation Engine**: `@esotericsoftware/spine-player` (v4.x WebGL Runtime)

---

## 📂 디렉토리 구조 (Directory Structure)

```text
spine-player-test/
├── public/                # 정적 웹 파일
├── src/                   # 소스 코드 (상세설명은 src/README.md)
│   ├── Component/         # SpinePlayer WebGL Canvas 생성 컴포넌트
│   └── asset/             # 캐릭터 스켈레톤 JSON, 아틀라스 및 텍스처 파일
└── README.md
```

- **[src README 바로가기](./src/README.md)**: 소스 컴포넌트 및 리소스 사용 안내.
