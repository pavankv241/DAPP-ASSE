import React from "react";
import { useWalletContext } from "../context/WalletContext.jsx";

export default function Wallet() {
  const { address, connect, disconnect } = useWalletContext();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
      {address ? (
        <>
          <span style={{ fontFamily: "monospace", fontSize: 14, background: "#232336", padding: "4px 10px", borderRadius: 8, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis" }} title={address}>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button style={{ flexShrink: 1, fontSize: 13, padding: "6px 10px", minWidth: 0 }} onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </div>
  );
} 