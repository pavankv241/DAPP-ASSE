import React from "react";
import { WalletProvider } from "./context/WalletContext.jsx";
import Wallet from "./components/Wallet.jsx";
import TokenBalance from "./components/TokenBalance.jsx";
import StakingPanel from "./components/StakingPanel.jsx";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Staking dApp</div>
      <div className="navbar-wallet">
        <Wallet />
      </div>
    </nav>
  );
}

function App() {
  return (
    <WalletProvider>
      <Navbar />
      <div className="App">
        <h2>
          <span className="token-avatar" />
          Staking dApp Dashboard
        </h2>
        <TokenBalance />
        <StakingPanel />
      </div>
    </WalletProvider>
  );
}

export default App; 