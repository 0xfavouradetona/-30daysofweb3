const hre = require("hardhat");

async function main() {
  const FaveTestNFT = await hre.ethers.getContractFactory("FaveTestNFT");
  const favetestnft = await FaveTestNFT.deploy();

  await favetestnft.deployed();

  console.log("FaveTestNFT deployed to:", favetestnft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
