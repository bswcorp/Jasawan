const { run } = require("hardhat");

async function main() {
  const settlementAddress = process.env.SETTLEMENT_CONTRACT;
  const paymentToken = process.env.PAYMENT_TOKEN;

  if (!settlementAddress || !paymentToken) {
    throw new Error("❌ SETTLEMENT_CONTRACT atau PAYMENT_TOKEN belum di-set di environment variables");
  }

  console.log("🚀 Verifying Settlement contract at:", settlementAddress);

  await run("verify:verify", {
    address: settlementAddress,
    constructorArguments: [paymentToken],
  });

  console.log("✅ Verification submitted to Etherscan");
}

main().catch((error) => {
  console.error("❌ Verification failed:", error);
  process.exitCode = 1;
});
