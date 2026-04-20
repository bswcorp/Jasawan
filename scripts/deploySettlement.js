const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying contracts with account:", deployer.address);

  const Settlement = await ethers.getContractFactory("Settlement");
  const paymentToken = process.env.PAYMENT_TOKEN; // alamat token QState/e-Rupiah
  const settlement = await Settlement.deploy(paymentToken);

  await settlement.deployed();

  console.log("✅ Settlement contract deployed at:", settlement.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
