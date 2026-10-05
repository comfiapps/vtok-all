# 📂 Metamask-Template - `src` 디렉토리 구성

- **`Page/Connect.js`**: `window.ethereum.request({ method: 'eth_requestAccounts' })`를 호출하여 지갑 수락 팝업을 띄우고 지갑 주소를 반환하는 컴포넌트.
- **`Page/Change.js`**: `ethereum.on('accountsChanged', ...)` 및 `ethereum.on('chainChanged', ...)` 핸들러를 등록하여 실시간 상태를 변경하는 모듈.
