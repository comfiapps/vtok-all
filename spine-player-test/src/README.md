# 📂 spine-player-test - `src` 상세 렌더링 코드 명세

### 1. `Component/SpinePlayer.js`
```js
import React, { useEffect, useRef } from 'react';
import { SpinePlayer } from '@esotericsoftware/spine-player';
import '@esotericsoftware/spine-player/dist/spine-player.css';

function SpinePlayerComponent() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            new SpinePlayer(containerRef.current, {
                jsonUrl: '/asset/character.json',
                atlasUrl: '/asset/character.atlas',
                animation: 'idle',
                premultipliedAlpha: true,
                backgroundColor: '#00000000',
                showControls: true
            });
        }
    }, []);

    return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
}

export default SpinePlayerComponent;
```

### 2. `asset/` 디렉토리 구성
- `character.json`: 스파인 2D 스켈레톤 본(Bone) 및 애니메이션 키프레임 좌표 데이터.
- `character.atlas`: 아틀라스 이미지 텍스처 매핑 텍스트 파일.
- `character.png`: 텍스처 그래픽 스프라이트 이미지.
