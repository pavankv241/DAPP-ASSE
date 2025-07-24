/* global BigInt */
import React, { useState } from "react";
import useWallet from "../hooks/useWallet";
import useStaking from "../hooks/useStaking";
import useToken from "../hooks/useToken";

export default function StakingPanel() {
  const { address, signer } = useWallet();
  const { staked, stake, unstake } = useStaking(address, signer);
  const { allowance, approve } = useToken(address, signer?.provider, signer);
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [approving, setApproving] = useState(false);

  const needsApproval = stakeAmount && allowance && window.BigInt(allowance) < window.BigInt(stakeAmount);

  const handleApprove = async (e) => {
    e.preventDefault();
    setApproving(true);
    setError("");
    try {
      await approve(stakeAmount);
    } catch (err) {
      setError(err.message);
    }
    setApproving(false);
  };

  const handleStake = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await stake(stakeAmount);
      setStakeAmount("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleUnstake = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await unstake(unstakeAmount);
      setUnstakeAmount("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <strong>Staked:</strong> {staked !== null ? staked.toString() : "-"}
      </div>
      <form onSubmit={needsApproval ? handleApprove : handleStake} style={{ marginBottom: 8 }}>
        <input
          type="number"
          min="0"
          step="any"
          placeholder="Amount to stake (wei)"
          value={stakeAmount}
          onChange={e => setStakeAmount(e.target.value)}
          disabled={loading || approving}
        />
        {needsApproval ? (
          <button type="submit" disabled={approving || !stakeAmount}>Approve</button>
        ) : (
          <button type="submit" disabled={loading || !stakeAmount}>Stake</button>
        )}
      </form>
      <form onSubmit={handleUnstake}>
        <input
          type="number"
          min="0"
          step="any"
          placeholder="Amount to unstake (wei)"
          value={unstakeAmount}
          onChange={e => setUnstakeAmount(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !unstakeAmount}>Unstake</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
} 