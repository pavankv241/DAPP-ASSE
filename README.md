# Staking dApp

## Deployment Instructions

### 1. Clone the repo

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file in the project root with:
```
SEPOLIA_RPC_URL=YOUR_SEPOLIA_RPC_URL
SEPOLIA_PRIVATE_KEY=YOUR_PRIVATE_KEY
```

### 4. Deploy contracts to Sepolia
```bash
npx hardhat ignition deploy ignition/modules/MyTokenAndStaking.js --network sepolia
```

### 5. Start the frontend
```bash
cd frontend
npm install
npm run build
npm start
```

### 6. (Optional) Deploy frontend to Vercel
- Set the same `.env` variables in Vercel’s dashboard (Project Settings → Environment Variables).
- Never commit your `.env` file or private key to git.

```
assessment
├─ .DS_Store
├─ .dist
├─ .qodo
├─ README.md
├─ artifacts
│  ├─ @openzeppelin
│  │  └─ contracts
│  │     ├─ interfaces
│  │     │  ├─ IERC1363.sol
│  │     │  │  ├─ IERC1363.dbg.json
│  │     │  │  └─ IERC1363.json
│  │     │  └─ draft-IERC6093.sol
│  │     │     ├─ IERC1155Errors.dbg.json
│  │     │     ├─ IERC1155Errors.json
│  │     │     ├─ IERC20Errors.dbg.json
│  │     │     ├─ IERC20Errors.json
│  │     │     ├─ IERC721Errors.dbg.json
│  │     │     └─ IERC721Errors.json
│  │     ├─ token
│  │     │  └─ ERC20
│  │     │     ├─ ERC20.sol
│  │     │     │  ├─ ERC20.dbg.json
│  │     │     │  └─ ERC20.json
│  │     │     ├─ IERC20.sol
│  │     │     │  ├─ IERC20.dbg.json
│  │     │     │  └─ IERC20.json
│  │     │     ├─ extensions
│  │     │     │  └─ IERC20Metadata.sol
│  │     │     │     ├─ IERC20Metadata.dbg.json
│  │     │     │     └─ IERC20Metadata.json
│  │     │     └─ utils
│  │     │        └─ SafeERC20.sol
│  │     │           ├─ SafeERC20.dbg.json
│  │     │           └─ SafeERC20.json
│  │     └─ utils
│  │        ├─ Context.sol
│  │        │  ├─ Context.dbg.json
│  │        │  └─ Context.json
│  │        └─ introspection
│  │           └─ IERC165.sol
│  │              ├─ IERC165.dbg.json
│  │              └─ IERC165.json
│  ├─ build-info
│  │  └─ ebdc5b787e16abefc188eeb71c44d048.json
│  └─ contracts
│     ├─ MyToken.sol
│     │  ├─ MyToken.dbg.json
│     │  └─ MyToken.json
│     └─ Staking.sol
│        ├─ Staking.dbg.json
│        └─ Staking.json
├─ cache
│  └─ solidity-files-cache.json
├─ contracts
│  ├─ MyToken.sol
│  └─ Staking.sol
├─ frontend
│  ├─ .DS_Store
│  ├─ README.md
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  └─ src
│     ├─ App.css
│     ├─ App.jsx
│     ├─ App.test.js
│     ├─ components
│     │  ├─ StakingPanel.jsx
│     │  ├─ TokenBalance.jsx
│     │  └─ Wallet.jsx
│     ├─ context
│     │  └─ WalletContext.jsx
│     ├─ hooks
│     │  ├─ useStaking.js
│     │  ├─ useToken.js
│     │  └─ useWallet.js
│     ├─ index.css
│     ├─ index.js
│     ├─ logo.svg
│     ├─ reportWebVitals.js
│     ├─ service-worker.js
│     ├─ serviceWorkerRegistration.js
│     └─ setupTests.js
├─ hardhat.config.js
├─ ignition
│  ├─ .DS_Store
│  ├─ deployments
│  │  └─ chain-11155111
│  │     ├─ artifacts
│  │     │  ├─ MyTokenAndStaking#MyToken.dbg.json
│  │     │  ├─ MyTokenAndStaking#MyToken.json
│  │     │  ├─ MyTokenAndStaking#Staking.dbg.json
│  │     │  └─ MyTokenAndStaking#Staking.json
│  │     ├─ build-info
│  │     │  └─ ebdc5b787e16abefc188eeb71c44d048.json
│  │     ├─ deployed_addresses.json
│  │     └─ journal.jsonl
│  └─ modules
│     ├─ Lock.js
│     └─ MyTokenAndStaking.js
├─ package-lock.json
├─ package.json
├─ scripts
│  ├─ deploy.js
│  └─ transfer.js
├─ src
│  ├─ .DS_Store
│  ├─ components
│  │  └─ StakingPanel.js
│  └─ hooks
│     ├─ useStaking.js
│     └─ useWallet.js
└─ test
   └─ MyToken-Staking.js

```