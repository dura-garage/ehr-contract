# Solidity API

## ehr

### owner

```solidity
address owner
```

### Status

```solidity
enum Status {
  NOT_REGISTERED,
  REGISTERED,
  DOCTOR,
  ADMIN
}
```

### Hospital

```solidity
struct Hospital {
  string name;
  address admin;
  address[] doctors;
  string image;
}
```

### Record

```solidity
struct Record {
  string dataHash;
  address doctor;
  address patient;
  uint256 timestamp;
}
```

### User

```solidity
struct User {
  enum ehr.Status status;
  address[] doctors;
  address[] patients;
}
```

### hospitals

```solidity
mapping(address => struct ehr.Hospital) hospitals
```

### hospitalsArray

```solidity
struct ehr.Hospital[] hospitalsArray
```

_hospital admin address => hospital_

### users

```solidity
mapping(address => struct ehr.User) users
```

### constructor

```solidity
constructor() public
```

_patient address => doctor address => access granted_

### onlyOwner

```solidity
modifier onlyOwner()
```

### onlyHospitalAdmin

```solidity
modifier onlyHospitalAdmin()
```

### onlyRegisteredUser

```solidity
modifier onlyRegisteredUser(address doc_address)
```

### onlyDoctor

```solidity
modifier onlyDoctor(address doc_address)
```

### UserRegistered

```solidity
event UserRegistered(address user)
```

Event emitted when a new user is registered

### DoctorRegistered

```solidity
event DoctorRegistered(address doctor)
```

Event emitted when a registered user is registered as a doctor

### HospitalRegistered

```solidity
event HospitalRegistered(address hospital_admin)
```

Event emitted when a new hospital is registered by the owner of the contract

### DoctorAddedToHospital

```solidity
event DoctorAddedToHospital(address doctor, address hospital)
```

Event emitted when a doctor is added to a hospital

### RecordSentToPatient

```solidity
event RecordSentToPatient(address doctor, address patient)
```

Event emitted when a doctor sends a record to a patient

### AccessRequested

```solidity
event AccessRequested(address doctor, address patient)
```

Event emitted when a doctor requests access to a patient's record

### AccessGranted

```solidity
event AccessGranted(address doctor, address patient)
```

Event emitted when a patient grants access to a doctor

### AccessRevoked

```solidity
event AccessRevoked(address doctor, address patient)
```

Event emitted when a patient revokes access to a doctor

### getOwner

```solidity
function getOwner() public view returns (address)
```

Get the owner of the contract

_Return the owner of the contract_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | owner |

### registerUser

```solidity
function registerUser() external returns (bool)
```

User registration

_Add user to the users mapping_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the user is registered |

### getUserStatus

```solidity
function getUserStatus(address _user_address) external view returns (enum ehr.Status)
```

Get the status of a user

_Return the status of a user_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _user_address | address | the address of the user |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum ehr.Status | status of the user |

### getUserDoctors

```solidity
function getUserDoctors(address _patient_address) external view returns (address[])
```

Get the doctors of a patient

_Return the doctors of a patie_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _patient_address | address | the address of the patie |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | doctors of the patie |

### getUserPatients

```solidity
function getUserPatients(address _doctor_address) external view returns (address[])
```

Get the patients of a doctor

_Return the patients of a doctor_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _doctor_address | address | the address of the doctor |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | patients of the doctor |

### registerDoctor

```solidity
function registerDoctor(address _doc_address) external returns (bool)
```

Doctor registration, only the owner of the contract can call this function

_Set the user status to DOCTOR_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the user is registered as a doctor |

### registerHospital

```solidity
function registerHospital(address _hospital_admin_address, string name, string logo) external returns (bool)
```

Register a hospital, only the owner of the contract can call this function

_Add a hospital to the hospitals mapping_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _hospital_admin_address | address | the address of the hospital |
| name | string | the name of the hospital |
| logo | string | the logo of the hospital |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the hospital is registered |

### getAllHospitals

```solidity
function getAllHospitals() external view returns (struct ehr.Hospital[])
```

### addDoctorToHospital

```solidity
function addDoctorToHospital(address _doctor_address) external returns (bool)
```

Add a doctor to a hospital, only the admin of the hospital can call this function

_Add a doctor to the doctors array of the hospital_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _doctor_address | address | the address of the doctor |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the doctor is added to the hospital |

### getDoctors

```solidity
function getDoctors(address _hospital_admin_address) public view returns (address[])
```

Get the doctors of a hospital

_Return the doctors array of the hospital_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | the doctors array of the hospital |

### sendRecordToPatient

```solidity
function sendRecordToPatient(address _patient_address, string _dataHash) external returns (bool)
```

Doctor sends record to a patient, only a doctor can call this function

_Add a record to the recordOfUser mapping_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _patient_address | address | the address of the patient |
| _dataHash | string | the hash of the data |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the record is added to the recordOfUser mapping |

### getMyRecords

```solidity
function getMyRecords() external view returns (struct ehr.Record[])
```

Get the records of a user, only a user can call this function

_Return the records array of the user_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ehr.Record[] | the records array of the user |

### grantAccessToRecordHistory

```solidity
function grantAccessToRecordHistory(address _doctor_address) external returns (bool)
```

Patient grants access to a record to a doctor, only a patient can call this function

_set the accessGranted mapping to true, for the patient and the doctor and accessRequested to false_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _doctor_address | address | the address of the doctor |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the access is granted |

### revokeAccessToRecordHistory

```solidity
function revokeAccessToRecordHistory(address _doctor_address) external returns (bool)
```

Revoke access to a record from a doctor, only a patient can call this function

_set the accessGranted mapping to false, for the patient and the doctor_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _doctor_address | address | the address of the doctor |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the access is revoked |

### getAccessStatus

```solidity
function getAccessStatus(address _patient_address, address _doctor_address) external view returns (bool)
```

Get the access status of a record

_Return the access status of a record_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _patient_address | address | the address of the patient |
| _doctor_address | address | the address of the doctor |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | the access status of a record |

### getRecordHistoryOfPatient

```solidity
function getRecordHistoryOfPatient(address _patient_address) external view returns (struct ehr.Record[])
```

Doctor access the record of a patient, only a doctor can call this function

_Return the record of a patient_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _patient_address | address | the address of the patient |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ehr.Record[] | the record of a patient |

### isInArray

```solidity
function isInArray(address[] array, address item) internal pure returns (bool)
```

To check is an address is in the array

_Return true if the address is in the array_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| array | address[] | the array to check |
| item | address | the address to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the address is in the array |

