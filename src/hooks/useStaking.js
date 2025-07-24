import { useEffect, useState } from "react";
import { ethers } from "ethers";

const STAKING_ADDRESS = "0x581b7246BD787Fc52af30a35dfA3F0FA29d7BcFC";
const STAKING_ABI = [
  "function stakedBalance(address) view returns (uint256)",
  "function stake(uint256) external",
  "function unstake(uint256) external"
];

export default function useStaking(address, signer) {
  const [staked, setStaked] = useState(null);
  const contract = signer ? new ethers.Contract(STAKING_ADDRESS, STAKING_ABI, signer) : null;

  useEffect(() => {
    if (!address || !signer || !contract) return;
    let mounted = true;
    async function fetchStaked() {
      const staked = await contract.stakedBalance(address);
      if (mounted) setStaked(staked);
    }
    fetchStaked();
    return () => { mounted = false; };
  }, [address, signer, contract]);

  const stake = async (amount) => {
    if (!contract) throw new Error("No contract");
    const tx = await contract.stake(amount);
    await tx.wait();
    const staked = await contract.stakedBalance(address);
    setStaked(staked);
  };

  const unstake = async (amount) => {
    if (!contract) throw new Error("No contract");
    const tx = await contract.unstake(amount);
    await tx.wait();
    const staked = await contract.stakedBalance(address);
    setStaked(staked);
  };

  return { staked, stake, unstake };
} 