pragma solidity ^0.8.0;

contract EHRSystem {
    address public admin;
    // uint public numHospitals;

    struct Hospital {
        string name;
        address hospitalAddress;
        Patient[] doctors;
    }

    struct User {
        string firstName;
        string lastName;
        uint age;
        address patientAddress;
    }

    constructor() {
        admin = msg.sender;
    }

    mapping(address => Hospital) public hospitals;
    mapping(address => Patient) public patients;


    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyHospital(address hospitalAddress) {
        require(hospitals[hospitalAddress].hospitalAddress == hospitalAddress, "Invalid hospital address");
        _;
    }

    modifier onlyPatient(address patientAddress) {
        require(msg.sender == patientAddress, "Only patients can perform this action");
        _;
    }
}
