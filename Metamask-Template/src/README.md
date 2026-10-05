# 📂 Metamask-Template - `src` 소스 코드 설명

- **`Page/Connect.js`**
  - `window.ethereum.request({ method: 'eth_requestAccounts' })` 호출.
  - 리턴된 지갑 주소 배열(`accounts[0]`)을 React `state`에 저장하고 화면에 렌더링.

- **`Page/Change.js`**
  - `useEffect` 내에서 `window.ethereum.on('accountsChanged', (accounts) => ...)` 리스너 수신.
  - `window.ethereum.on('chainChanged', (chainId) => ...)` 리스너를 통해 네트워크 변경 시 자동 새로고침 또는 상태 업데이트.
