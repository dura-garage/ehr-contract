//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Test{

    struct Hospital{
        address admin;
        address[] doctors;
    }


    mapping(address => Hospital) public hospitals;/// @dev hospital admin address => hospital

    constructor() {
    }

    function addHospital(address _admin) public {
        hospitals[_admin].admin = _admin;
    }
    
    function getDoctors() public view returns(address[] memory){
        return hospitals[msg.sender].doctors;
    }
}