const hre = require("hardhat");

async function main() {
  // Deploy MyToken
  const initialSupply = hre.ethers.utils.parseEther("1000000");
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(initialSupply);
  await myToken.deployed();
  console.log("MyToken deployed to:", myToken.address);

  // Deploy Staking
  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(myToken.address);
  await staking.deployed();
  console.log("Staking deployed to:", staking.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 