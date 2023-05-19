//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// TODO: add error messages



/// @title Electronic Health Record
contract ehr {
    address public owner;

    enum Status {NOT_REGISTERED, REGISTERED, DOCTOR, ADMIN}

    struct Hospital{
        string name;
        string description;
        address admin;
        address[] doctors;
        string image;
    }

    struct Record{
        string dataHash;
        address doctor;
        address patient;
        uint256 timestamp;
    }

    struct User{
        Status status; // 0: not registered, 1: registered, 2: doctor, 3: adminofHospital
    }

    mapping(address => Hospital) public hospitals;/// @dev hospital admin address => hospital
    Hospital[] public hospitalsArray;

    mapping(address => User) public users;/// @dev user address => user
    mapping(address => Record[]) private recordOfUser;/// @dev user address => records
    mapping(address => mapping(address => bool)) private accessGranted;/// @dev patient address => doctor address => access granted
    mapping(address => mapping(address => bool)) private accessRequested;/// @dev patient address => doctor address => access requested
    
    // TODO: adding other data types

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT_OWNER");
        _;
    }

    modifier onlyHospitalAdmin() {
        require(hospitals[msg.sender].admin != address(0), "NOT_A_HOSPITAL");
        require(hospitals[msg.sender].admin == msg.sender, "NOT_ADMIN" );
        _;
    }
    
    modifier onlyRegisteredUser(address doc_address){
        require(users[doc_address].status != Status.NOT_REGISTERED, "NOT_REGISTERED");
        _;
    }

    modifier onlyDoctor(address doc_address){
        require(users[doc_address].status == Status.DOCTOR, "NOT_DOCTOR");
        _;
    }


    /// @notice Event emitted when a new user is registered 
    event UserRegistered(address indexed user);

    /// @notice Event emitted when a registered user is registered as a doctor
    event DoctorRegistered(address indexed doctor);

    /// @notice Event emitted when a new hospital is registered by the owner of the contract
    event HospitalRegistered(address indexed hospital_admin);

    /// @notice Event emitted when a doctor is added to a hospital
    event DoctorAddedToHospital(address indexed doctor, address indexed hospital);

    /// @notice Event emitted when a doctor sends a record to a patient
    event RecordSentToPatient(address indexed doctor, address indexed patient, string dataHash); // TODO: don't use the actual dataHash

    /// @notice Event emitted when a doctor requests access to a patient's record
    event AccessRequested(address indexed doctor, address indexed patient);

    /// @notice Event emitted when a patient grants access to a doctor
    event AccessGranted(address indexed doctor, address indexed patient);

    /// @notice Event emitted when a patient revokes access to a doctor
    event AccessRevoked(address indexed doctor, address indexed patient);


    /// @notice Get the owner of the contract
    /// @dev Return the owner of the contract
    /// @return owner 
    function getOwner() public view returns(address) {
        return owner;
    }

    /// @notice User registration
    /// @dev Add user to the users mapping
    /// @return true if the user is registered
    function registerUser() external returns(bool) {
        User memory user;
        user.status = Status.REGISTERED;
        users[msg.sender] = user;
        emit UserRegistered(msg.sender);
        return true;
    }

    /// @notice Get the status of a user
    /// @dev Return the status of a user
    /// @param _user_address the address of the user
    /// @return status of the user
    function getUserStatus(address _user_address) external view returns(Status) {
        return users[_user_address].status;
    }


    /// @notice Doctor registration, only the owner of the contract can call this function
    /// @dev Set the user status to DOCTOR
    /// @return true if the user is registered as a doctor
    function registerDoctor( address _doc_address) external  onlyOwner() onlyRegisteredUser(_doc_address)  returns(bool) {
        users[_doc_address].status = Status.DOCTOR;
        emit DoctorRegistered(_doc_address);
        return true;
    }

    /// @notice Register a hospital, only the owner of the contract can call this function
    /// @dev Add a hospital to the hospitals mapping
    /// @param _hospital_admin_address the address of the hospital
    /// @param name the name of the hospital
    /// @param logo the logo of the hospital
    /// @return true if the hospital is registered
    function registerHospital(address _hospital_admin_address, string memory name, string memory logo) external onlyOwner() onlyRegisteredUser(_hospital_admin_address) returns(bool) {
        Hospital memory hospital;
        hospital.name = name;
        hospital.admin = _hospital_admin_address;
        hospital.doctors = new address[](0);
        hospital.image = logo;

        users[_hospital_admin_address].status = Status.ADMIN;
        hospitals[_hospital_admin_address] = hospital;

        hospitalsArray.push(hospital);
        emit HospitalRegistered(_hospital_admin_address);
        return true;
    }

    function getAllHospitals() external view returns(Hospital[] memory){
        return hospitalsArray;
    }

    /// @notice Add a doctor to a hospital, only the admin of the hospital can call this function
    /// @dev Add a doctor to the doctors array of the hospital
    /// @param _doctor_address the address of the doctor
    /// @return true if the doctor is added to the hospital
    function addDoctorToHospital( address _doctor_address) external onlyHospitalAdmin() onlyRegisteredUser(_doctor_address) returns(bool) {
        hospitals[msg.sender].doctors.push(_doctor_address);
        emit DoctorAddedToHospital(_doctor_address, msg.sender);
        return true;
    }

    /// @notice Get the doctors of a hospital
    /// @dev Return the doctors array of the hospital
    /// @return the doctors array of the hospital
    function getDoctors(address _hospital_admin_address) public view returns(address[] memory){
        return hospitals[_hospital_admin_address].doctors;
    }

    
    /// @notice Doctor sends record to a patient, only a doctor can call this function
    /// @dev Add a record to the recordOfUser mapping
    /// @param _patient_address the address of the patient
    /// @param _dataHash the hash of the data
    /// @return true if the record is added to the recordOfUser mapping
    function sendRecordToPatient(address _patient_address, string memory _dataHash) external onlyDoctor(msg.sender) onlyRegisteredUser(_patient_address) returns(bool) {
        Record memory record;
        record.dataHash = _dataHash;
        record.doctor = msg.sender;
        record.patient = _patient_address;
        record.timestamp = block.timestamp;
        recordOfUser[_patient_address].push(record);
        return true;
    }

    /// @notice Get the records of a user, only a user can call this function
    /// @dev Return the records array of the user
    /// @return the records array of the user
    function getMyRecords() external view onlyRegisteredUser(msg.sender) returns(Record[] memory){
        return recordOfUser[msg.sender];
    }

    /// @notice Doctor requests access to a record from patient, only a doctor can call this function
    /// @dev set the accessRequested mapping to true, for the patient and the doctor
    /// @param _patient_address the address of the patient
    /// @return true if the access is requested
    function requestAccessToRecordHistory(address _patient_address) external onlyDoctor(msg.sender) onlyRegisteredUser(_patient_address) returns(bool) {
        accessRequested[_patient_address][msg.sender] = true;
        emit AccessRequested(msg.sender, _patient_address);
        return true;
    }
    
    /// @notice Patient grants access to a record to a doctor, only a patient can call this function
    /// @dev set the accessGranted mapping to true, for the patient and the doctor and accessRequested to false
    /// @param _doctor_address the address of the doctor
    /// @return true if the access is granted
    function grantAccessToRecordHistory(address _doctor_address) external onlyRegisteredUser(msg.sender) onlyRegisteredUser(_doctor_address) returns(bool) {
        accessGranted[msg.sender][_doctor_address] = true;
        accessRequested[msg.sender][_doctor_address] = false;
        emit AccessGranted(_doctor_address, msg.sender);
        return true;
    }

    /// @notice Revoke access to a record from a doctor, only a patient can call this function
    /// @dev set the accessGranted mapping to false, for the patient and the doctor
    /// @param _doctor_address the address of the doctor
    /// @return true if the access is revoked
    function revokeAccessToRecordHistory(address _doctor_address) external onlyRegisteredUser(msg.sender) onlyRegisteredUser(_doctor_address) returns(bool) {
        accessGranted[msg.sender][_doctor_address] = false;
        emit AccessRevoked(_doctor_address, msg.sender);
        return true;
    }  

    /// @notice Get the access status of a record 
    /// @dev Return the access status of a record
    /// @param _patient_address the address of the patient
    /// @param _doctor_address the address of the doctor
    /// @return the access status of a record
    function getAccessStatus(address _patient_address, address _doctor_address) external view onlyRegisteredUser(_patient_address) onlyRegisteredUser(_doctor_address) returns(bool) {
        require(msg.sender == _patient_address || msg.sender == _doctor_address, "Cannot access this record");
        return accessGranted[_patient_address][_doctor_address];
    }

    /// @notice Get the request status of a record
    /// @dev Return the request status of a record
    /// @param _patient_address the address of the patient
    /// @param _doctor_address the address of the doctor
    /// @return the request status of a record
    function getRequestStatus(address _patient_address, address _doctor_address) external view onlyRegisteredUser(_patient_address) onlyRegisteredUser(_doctor_address) returns(bool) {
        require(msg.sender == _patient_address || msg.sender == _doctor_address, "Cannot access this record");
        return accessRequested[_patient_address][_doctor_address];
    }


    /// @notice Doctor access the record of a patient, only a doctor can call this function
    /// @dev Return the record of a patient
    /// @param _patient_address the address of the patient
    /// @return the record of a patient
    function getRecordHistoryOfPatient(address _patient_address) external view onlyDoctor(msg.sender) onlyRegisteredUser(_patient_address) returns(Record[] memory) {
        require(accessGranted[_patient_address][msg.sender] == true, "Access not granted");
        return recordOfUser[_patient_address];
    }





}