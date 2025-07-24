import React, { useState } from "react";
import { useWalletContext } from "../context/WalletContext.jsx";
import useStaking from "../hooks/useStaking";
import useToken from "../hooks/useToken.js";
import { parseUnits, formatUnits } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StakingPanel() {
  const { address, signer } = useWalletContext();
  const { staked, stake, unstake } = useStaking(address, signer);
  const { allowance, approve, decimals, balance } = useToken(address, signer?.provider, signer);
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [approving, setApproving] = useState(false);

  const canStake = !!signer && !!address;
  const parsedStakeAmount = stakeAmount && decimals !== undefined ? window.BigInt(parseUnits(stakeAmount, decimals)) : 0n;
  const needsApproval = !!stakeAmount && allowance !== null && window.BigInt(allowance) < parsedStakeAmount;

  const handleApprove = async (e) => {
    e.preventDefault();
    setApproving(true);
    setError("");
    try {
      await approve(parseUnits(stakeAmount, decimals));
    } catch (err) {
      setError("Approval failed: " + (err.reason || err.message));
    }
    setApproving(false);
  };

  const handleStake = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (parsedStakeAmount > window.BigInt(balance)) {
        setError("Insufficient MyToken balance.");
        setLoading(false);
        return;
      }
      await stake(parsedStakeAmount);
      toast.success(`Staked ${stakeAmount} tokens!`);
      setStakeAmount("");
    } catch (err) {
      setError("Stake failed: " + (err.reason || err.message));
    }
    setLoading(false);
  };

  const handleUnstake = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await unstake(parseUnits(unstakeAmount, decimals));
      setUnstakeAmount("");
    } catch (err) {
      setError("Unstake failed: " + (err.reason || err.message));
    }
    setLoading(false);
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <div style={{ marginBottom: 16 }}>
        <strong>Staked:</strong> {staked !== null ? formatUnits(staked, decimals) : "-"}
      </div>
      <div style={{ marginBottom: 8, fontSize: 14, color: '#555' }}>
        <div><strong>MyToken Balance:</strong> {balance !== null ? formatUnits(balance, decimals) : "-"}</div>
        <div><strong>Allowance:</strong> {allowance !== null ? formatUnits(allowance, decimals) : "-"}</div>
      </div>
      {!address && (
        <div style={{ color: "#b00", marginBottom: 8 }}>
          Connect your wallet to stake or unstake.
        </div>
      )}
      <form onSubmit={needsApproval ? handleApprove : handleStake} style={{ marginBottom: 8 }}>
        <input
          type="number"
          min="0"
          step="any"
          placeholder={`Amount to stake (${decimals !== undefined ? 'tokens' : ''})`}
          value={stakeAmount}
          onChange={e => setStakeAmount(e.target.value)}
        />
        {needsApproval ? (
          <button type="submit" disabled={approving || !stakeAmount || !canStake}>Approve</button>
        ) : (
          <button type="submit" disabled={loading || !stakeAmount || !canStake}>Stake</button>
        )}
      </form>
      <form onSubmit={handleUnstake}>
        <input
          type="number"
          min="0"
          step="any"
          placeholder={`Amount to unstake (${decimals !== undefined ? 'tokens' : ''})`}
          value={unstakeAmount}
          onChange={e => setUnstakeAmount(e.target.value)}
        />
        <button type="submit" disabled={loading || !unstakeAmount || !canStake}>Unstake</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}