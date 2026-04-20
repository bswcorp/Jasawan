const { ethers } = require("hardhat");

async function main() {
  // Parameter settlement
  const assetId = "ASSET_BUMN_X"; // ganti sesuai hasil scanner garage
  const amount = ethers.utils.parseEther("100"); // jumlah buyout
  const h2kValid = true; // hasil validasi H2K
  const recipientAccount = "VA_OPA_TRANSPARENT_TAX_LEDGER"; // akun halal

  // Ambil signer utama
  const [executor] = await ethers.getSigners();

  // Ambil instance kontrak Settlement
  const settlementAddress = process.env.SETTLEMENT_CONTRACT; // alamat kontrak dari deploy
  const Settlement = await ethers.getContractFactory("Settlement");
  const settlement = Settlement.attach(settlementAddress);

  // Eksekusi buyout
  const tx = await settlement
    .connect(executor)
    .settleAssetBuyout(assetId, amount, h2kValid, recipientAccount);

  const receipt = await tx.wait();

  console.log("✅ Settlement executed");
  console.log("Asset ID:", assetId);
  console.log("Executor:", executor.address);
  console.log("Amount:", amount.toString());
  console.log("Recipient:", recipientAccount);

  // Audit event
  const event = receipt.events.find(e => e.event === "AssetSettled");
  if (event) {
    console.log("📜 Audit Event:", {
      assetId: event.args.assetId,
      executor: event.args.executor,
      amount: event.args.amount.toString(),
      recipientAccount: event.args.recipientAccount,
      status: event.args.status,
    });
  }
}

main().catch((error) => {
  console.error("❌ Settlement failed:", error);
  process.exitCode = 1;
});
