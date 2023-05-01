// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract C1 {
    address public _owner;

    constructor() {
        _owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }
}