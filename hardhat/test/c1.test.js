// Test for c1.sol
// // We import Chai to use its asserting functions here.

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("C1", function () {

    it("Should return the owner of the contract", async function () {
        const deployer = await ethers.provider.getSigner(0);
        const C1 = await ethers.getContractFactory("C1", deployer);
        const c1 = await C1.deploy();
        await c1.deployed();
        expect(await c1.getOwner()).to.equal(await ethers.provider.getSigner(0).getAddress());
    }
    );
});
