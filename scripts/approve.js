const { ethers } = require("hardhat");

async function main() {
  const [executor] = await ethers.getSigners();

  const tokenAddress = process.env.PAYMENT_TOKEN; // alamat token (QStateToken/e-Rupiah)
  const SettlementAddress = process.env.SETTLEMENT_CONTRACT; // alamat kontrak Settlement

  const Token = await ethers.getContractFactory("QStateToken");
  const token = Token.attach(tokenAddress);

  const amount = ethers.utils.parseEther("1000"); // jumlah maksimal approve

  const tx = await token.connect(executor).approve(SettlementAddress, amount);
  await tx.wait();

  console.log("✅ Approval granted for Settlement contract");
}

main().catch((error) => {
  console.error("❌ Approval failed:", error);
  process.exitCode = 1;
});
