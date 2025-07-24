const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken and Staking integration", function () {
  let MyToken, Staking, myToken, staking, owner, user1, user2, initialSupply, myTokenAddress;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    initialSupply = ethers.parseEther("1000");
    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(initialSupply);
    await myToken.waitForDeployment();
    myTokenAddress = await myToken.getAddress();

    Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(myTokenAddress);
    await staking.waitForDeployment();
  });

  it("should mint initial supply to owner", async function () {
    expect(await myToken.balanceOf(owner.address)).to.equal(initialSupply);
  });

  it("should allow user to stake tokens and emit event", async function () {
    await myToken.transfer(user1.address, ethers.parseEther("100"));
    await myToken.connect(user1).approve(staking.getAddress(), ethers.parseEther("50"));
    await expect(staking.connect(user1).stake(ethers.parseEther("50")))
      .to.emit(staking, "Staked")
      .withArgs(user1.address, ethers.parseEther("50"));
    expect(await staking.stakedBalance(user1.address)).to.equal(ethers.parseEther("50"));
    expect(await myToken.balanceOf(await staking.getAddress())).to.equal(ethers.parseEther("50"));
  });

  it("should not allow staking zero tokens", async function () {
    await expect(staking.stake(0)).to.be.revertedWith("Cannot stake 0");
  });

  it("should allow user to unstake tokens and emit event", async function () {
    await myToken.transfer(user1.address, ethers.parseEther("100"));
    await myToken.connect(user1).approve(staking.getAddress(), ethers.parseEther("50"));
    await staking.connect(user1).stake(ethers.parseEther("50"));
    await expect(staking.connect(user1).unstake(ethers.parseEther("20")))
      .to.emit(staking, "Unstaked")
      .withArgs(user1.address, ethers.parseEther("20"));
    expect(await staking.stakedBalance(user1.address)).to.equal(ethers.parseEther("30"));
    expect(await myToken.balanceOf(user1.address)).to.equal(ethers.parseEther("70"));
  });

  it("should not allow unstaking more than staked", async function () {
    await myToken.transfer(user1.address, ethers.parseEther("100"));
    await myToken.connect(user1).approve(staking.getAddress(), ethers.parseEther("50"));
    await staking.connect(user1).stake(ethers.parseEther("50"));
    await expect(staking.connect(user1).unstake(ethers.parseEther("60"))).to.be.revertedWith("Insufficient staked balance");
  });

  it("should return correct staked balance via getStakedBalance", async function () {
    await myToken.transfer(user1.address, ethers.parseEther("100"));
    await myToken.connect(user1).approve(staking.getAddress(), ethers.parseEther("40"));
    await staking.connect(user1).stake(ethers.parseEther("40"));
    expect(await staking.getStakedBalance(user1.address)).to.equal(ethers.parseEther("40"));
  });
}); 