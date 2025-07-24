import { useEffect, useState } from "react";
import { ethers } from "ethers";

const MYTOKEN_ADDRESS = "0x83b818AcD17Af6f5dA0a95ee22318F44f1b91CbE"; // ERC20 STAKE/UNSTAKE
const STAKING_ADDRESS = "0x581b7246BD787Fc52af30a35dfA3F0FA29d7BcFC";
const MYTOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function approve(address,uint256) external returns (bool)",
  "function allowance(address,address) view returns (uint256)"
];

export default function useToken(address, provider, signer) {
  const [balance, setBalance] = useState(null);
  const [decimals, setDecimals] = useState(18);
  const [allowance, setAllowance] = useState(null);

  useEffect(() => {
    if (!address || !provider) return;
    const contract = new ethers.Contract(MYTOKEN_ADDRESS, MYTOKEN_ABI, provider);
    let mounted = true;
    async function fetchBalance() {
      const [bal, dec] = await Promise.all([
        contract.balanceOf(address),
        contract.decimals()
      ]);
      if (mounted) {
        setBalance(bal);
        setDecimals(dec);
      }
    }
    fetchBalance();
    return () => { mounted = false; };
  }, [address, provider]);

  useEffect(() => {
    if (!address || !provider) return;
    const contract = new ethers.Contract(MYTOKEN_ADDRESS, MYTOKEN_ABI, provider);
    let mounted = true;
    async function fetchAllowance() {
      const allowance = await contract.allowance(address, STAKING_ADDRESS);
      if (mounted) setAllowance(allowance);
    }
    fetchAllowance();
    return () => { mounted = false; };
  }, [address, provider]);

  const approve = async (amount) => {
    if (!signer) throw new Error("No signer");
    const contract = new ethers.Contract(MYTOKEN_ADDRESS, MYTOKEN_ABI, signer);
    const tx = await contract.approve(STAKING_ADDRESS, amount);
    await tx.wait();
    const newAllowance = await contract.allowance(await signer.getAddress(), STAKING_ADDRESS);
    setAllowance(newAllowance);
  };

  return { balance, decimals, allowance, approve };
} 