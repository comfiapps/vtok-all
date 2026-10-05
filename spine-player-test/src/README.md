# 📂 spine-player-test - `src` 상세 명세

- **`Component/SpinePlayer.js`**
  - `@esotericsoftware/spine-player`에서 `SpinePlayer` 클래스를 임포트.
  - HTML `div` 컨테이너 엘리먼트에 `jsonUrl`, `atlasUrl`, `animation`, `premultipliedAlpha` 속성을 지정하여 WebGL 캔버스 생성 및 캐릭터 애니메이션(idle, walk, jump 등) 컨트롤러 렌더링.

- **`asset/`**
  - `.json`: Spine 애니메이션 뼈대 및 키프레임 스켈레톤 자원.
  - `.atlas`: 아틀라스 이미지 텍스처 좌표 맵 파일.
  - `.png`: 스파인 캐릭터 그래픽 이미지 파일.
