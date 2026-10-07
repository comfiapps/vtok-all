//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Practice1 {
    int256 bigNumbewr = 15000000000;
    int32 int_1 = -2344300;
    uint16 smallPositiveNumber = 23202;

    address ownerAddress;

    constructor(address owner) {
        ownerAddress = owner;
        console.log("Practice1 constructor");
    }

    modifier onlyOwner() {
        require(msg.sender == ownerAddress);
        _;
    }

    function test() public {
        
        // wei 단위 전송한다.
        //ownerAddress.transfer();
    }
    
    function print1() external pure returns (string memory) {
        string memory value = "Hello!!";
        return value;
    }

    function printOwner() external view onlyOwner returns (string memory) {
        string memory value = "Hello Onwer";
        return value;
    }
}