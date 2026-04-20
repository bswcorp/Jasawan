const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERupiahBridge", function () {
  let Bridge, bridge, AksaToken, aksa, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy dummy AKSA token
    const Token = await ethers.getContractFactory("QStateToken");
    aksa = await Token.deploy();
    await aksa.deployed();

    // Deploy bridge
    Bridge = await ethers.getContractFactory("ERupiahBridge");
    bridge = await Bridge.deploy(aksa.address);
    await bridge.deployed();

    // Mint AKSA to bridge for liquidity
    await aksa.mint(bridge.address, ethers.utils.parseEther("1000"));
  });

  it("should bridge e-Rupiah to AKSA with valid H2K", async function () {
    const amount = ethers.utils.parseEther("100");
    const h2kValid = true;

    await expect(
      bridge.connect(user).bridgeToAksa(amount, h2kValid)
    )
      .to.emit(bridge, "AssetBridged")
      .withArgs(user.address, amount);

    const balance = await aksa.balanceOf(user.address);
    expect(balance).to.equal(amount);
  });

  it("should reject bridge if H2K invalid", async function () {
    const amount = ethers.utils.parseEther("50");
    const h2kValid = false;

    await expect(
      bridge.connect(user).bridgeToAksa(amount, h2kValid)
    ).to.be.revertedWith("H2K validation failed");
  });

  it("should reject bridge if vault liquidity insufficient", async function () {
    const amount = ethers.utils.parseEther("2000"); // more than minted
    const h2kValid = true;

    await expect(
      bridge.connect(user).bridgeToAksa(amount, h2kValid)
    ).to.be.revertedWith("Insufficient AKSA liquidity in vault");
  });

  it("should allow owner to update AKSA address", async function () {
    const Token = await ethers.getContractFactory("QStateToken");
    const newAksa = await Token.deploy();
    await newAksa.deployed();

    await expect(bridge.updateAksaAddress(newAksa.address))
      .to.emit(bridge, "AssetReleased"); // contoh event tambahan

    expect(await bridge.aksaToken()).to.equal(newAksa.address);
  });

  it("should prevent non-owner from updating AKSA address", async function () {
    const Token = await ethers.getContractFactory("QStateToken");
    const newAksa = await Token.deploy();
    await newAksa.deployed();

    await expect(
      bridge.connect(user).updateAksaAddress(newAksa.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
