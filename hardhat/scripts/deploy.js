// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // We get the contract to deploy
  const C1 = await ethers.getContractFactory("ehr");
  const c1 = await C1.deploy();
  await c1.deployed();
  console.log("EHR Contract Address:", c1.address);

  // save the config files in each deploy
  saveFrontendFiles(c1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
function saveFrontendFiles(ehr) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../client/src/constants";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ ehr: ehr.address }, undefined, 2)
  );

  const ehrArtifact = artifacts.readArtifactSync("ehr");

  fs.writeFileSync(
    contractsDir + "/ehr.json",
    JSON.stringify(ehrArtifact, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
