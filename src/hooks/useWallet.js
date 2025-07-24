import { useState, useCallback, createContext, useContext } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert("MetaMask is required!");
      return;
    }
    const ethProvider = new ethers.BrowserProvider(window.ethereum);
    await ethProvider.send("eth_requestAccounts", []);
    const signer = await ethProvider.getSigner();
    const address = await signer.getAddress();
    setProvider(ethProvider);
    setSigner(signer);
    setAddress(address);
  }, []);

  const disconnect = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
  }, []);

  return (
    <WalletContext.Provider value={{ address, provider, signer, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  return useContext(WalletContext);
} 