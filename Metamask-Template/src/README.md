# 📂 Metamask-Template - `src` 상세 코드 명세

### 1. `Page/Connect.js` (지갑 연결)
```js
const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        } catch (error) {
            console.error("User rejected the connection request:", error);
        }
    } else {
        alert("MetaMask is not installed!");
    }
};
```

### 2. `Page/Change.js` (이벤트 리스너)
```js
useEffect(() => {
    if (window.ethereum) {
        const handleAccountsChanged = (accounts) => {
            if (accounts.length > 0) setAccount(accounts[0]);
            else setAccount(null);
        };
        const handleChainChanged = (chainId) => {
            window.location.reload();
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
    }
}, []);
```
