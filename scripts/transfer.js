const { ethers } = require("hardhat");

async function main() {
  const recipient = "0xaB30F936069261527F02Cdbb37167E8945628C29"; // Add your address
  const amount = ethers.parseEther("100");
  const myTokenAddress = "0x83b818AcD17Af6f5dA0a95ee22318F44f1b91CbE";

  const myToken = await ethers.getContractAt("MyToken", myTokenAddress);
  const tx = await myToken.transfer(recipient, amount);
  await tx.wait();
  console.log(`Transferred ${ethers.formatEther(amount)} tokens to ${recipient}`);
}

main().catch(console.error); 