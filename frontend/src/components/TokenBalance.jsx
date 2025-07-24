import React from "react";
import { useWalletContext } from "../context/WalletContext.jsx";
import useToken from "../hooks/useToken.js";
import { formatUnits } from "ethers";

export default function TokenBalance() {
  const { address, provider, signer } = useWalletContext();
  const { balance, decimals } = useToken(address, provider, signer);
  return (
    <div style={{ marginBottom: 24 }}>
      <strong>MyToken Balance:</strong>{" "}
      {balance !== null ? formatUnits(balance, decimals) : "-"}
    </div>
  );
}