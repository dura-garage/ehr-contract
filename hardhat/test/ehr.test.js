// Test for ehr.sol
// // We import Chai to use its asserting functions here.

const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("EHR", function () {
    it("Should return the owner of the contract", async function () {
        const deployer = await ethers.provider.getSigner(0);
        const EHR = await ethers.getContractFactory("ehr", deployer);
        const ehr = await EHR.deploy();
        await ehr.deployed();
        expect(await ehr.getOwner()).to.equal(await ethers.provider.getSigner(0).getAddress());
    }
    );

    it("Should add a user", async function () {
        const deployer = await ethers.provider.getSigner(0);
        const EHR = await ethers.getContractFactory("ehr", deployer);
        const ehr = await EHR.deploy();
        await ehr.deployed();

        await ehr.registerUser();
        expect(await ehr.users(deployer.getAddress())).to.equal(1);
    }
    );

    it("Should add a hospital", async function () {
        const deployer = await ethers.provider.getSigner(0);
        const EHR = await ethers.getContractFactory("ehr", deployer);
        const ehr = await EHR.deploy();
        await ehr.deployed();

        await ehr.registerUser();
        await ehr.registerHospital(deployer.getAddress());
        expect(await ehr.users(deployer.getAddress())).to.equal(3);
    });

    it("Should add a doctor", async function () {
        const [deployer, addr1, addr2] = await ethers.getSigners();
        const EHR = await ethers.getContractFactory("ehr", deployer);
        const ehr = await EHR.deploy();
        await ehr.deployed();

        await ehr.registerUser();
        await ehr.connect(addr1).registerUser();
        await ehr.connect(deployer).registerDoctor(addr1.getAddress());
        expect(await ehr.users(addr1.getAddress())).to.equal(2);
    });

    it("Should add a doctor to a hospital", async function () {
        const [deployer, addr1, addr2] = await ethers.getSigners();
        const EHR = await ethers.getContractFactory("ehr", deployer);
        const ehr = await EHR.deploy();
        await ehr.deployed();

        await ehr.registerUser();
        await ehr.connect(addr1).registerUser();
        await ehr.connect(addr2).registerUser();

        await ehr.connect(deployer).registerDoctor(addr1.getAddress());
        expect(await ehr.users(addr1.getAddress())).to.equal(2);

        await ehr.connect(deployer).registerHospital(addr2.getAddress());
        expect(await ehr.users(addr2.getAddress())).to.equal(3);

        let hospitals = await ehr.connect(addr2).getDoctors(addr2.getAddress());
        console.log(hospitals);
        await ehr.connect(addr2).addDoctorToHospital(addr1.getAddress());
        hospitals = await ehr.connect(addr2).getDoctors(addr2.getAddress());
       // console.log(hospitals);
    });

    it("Should send a record/report from doctor to a patient", async function () {
        const [deployer, addr1, addr2] = await ethers.getSigners();
        const EHR = await ethers.getContractFactory("ehr", deployer);
        const ehr = await EHR.deploy();
        await ehr.deployed();

        await ehr.registerUser();

        await ehr.connect(addr1).registerUser();
        await ehr.connect(addr2).registerUser();

        await ehr.connect(deployer).registerDoctor(addr1.getAddress());
        expect(await ehr.users(addr1.getAddress())).to.equal(2);

        await ehr.connect(deployer).registerHospital(addr2.getAddress());
        expect(await ehr.users(addr2.getAddress())).to.equal(3);

        await ehr.connect(addr2).addDoctorToHospital(addr1.getAddress());

        await ehr.connect(addr1).sendRecordToPatient(addr1.getAddress(), "This is a test record");
        let records = await ehr.connect(addr1).getMyRecords();
        //console.log(records);
    });

    it("Should send a record/report history access request from doctor to a patient", async function () {
        const [deployer, addr1, addr2, addr3] = await ethers.getSigners();
        const EHR = await ethers.getContractFactory("ehr", deployer);
        const ehr = await EHR.deploy();
        await ehr.deployed();

        await ehr.registerUser();

        await ehr.connect(addr1).registerUser();
        await ehr.connect(addr2).registerUser();
        await ehr.connect(addr3).registerUser();

        await ehr.connect(deployer).registerDoctor(addr1.getAddress());
        expect(await ehr.users(addr1.getAddress())).to.equal(2);

        await ehr.connect(deployer).registerHospital(addr2.getAddress());
        expect(await ehr.users(addr2.getAddress())).to.equal(3);

        await ehr.connect(addr2).addDoctorToHospital(addr1.getAddress());

        await ehr.connect(addr1).sendRecordToPatient(addr3.getAddress(), "This is a test record");

        let records = await ehr.connect(addr3).getMyRecords();
       // console.log(records);


        // TODO: check these functions individually

        await ehr.connect(addr1).requestAccessToRecordHistory(addr3.getAddress());
        await ehr.connect(addr3).grantAccessToRecordHistory(addr1.getAddress());
        await ehr.connect(addr3).revokeAccessToRecordHistory(addr1.getAddress());
        await expect(ehr.connect(addr1).getRecordHistoryOfPatient(addr3.getAddress()))
            .to.be.reverted;
    });
    

});