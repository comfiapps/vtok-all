//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}

/*
contract Annual {

    mapping(address => int8) annualMapping;
    uint8 totalAnnual;

    constructor(uint8 inializeAnnual) {
        totalAnnual = inializeAnnual;
    }

    modifier onlyMember() {
        require(annualMapping[msg.sender] != address(0), "caller is not member");
        _;
    }

    function registerEmployee(address employee, int8 initalizeAnnual) public {
        annualMapping[employee] = initalizeAnnual;
    }

    function useAnnual(address useAnnualAddress) external {
        
    }
}
*/