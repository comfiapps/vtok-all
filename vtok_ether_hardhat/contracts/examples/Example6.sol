//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Callee {
    uint public x;
    uint public value;

    function setX(uint _x) public returns (uint) {
        x = _x;
        return x;
    }

    function setXandSendEther(uint _x) public payable returns (uint, uint) {
        x = _x;
        value = msg.value;

        return (x, value);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

/// @dev 다른 컨트렉트를 불러오는 방법 (2)
contract Caller2 {

    function setX(Callee _callee, uint _x) public {
        uint x = _callee.setX(_x);

        console.log("setX return = %d", x);
    }

    function setXFromAddress(address _addr, uint _x) public {
        Callee callee = Callee(_addr);
        uint x = callee.setX(_x);
        console.log("setXFromAddress return = %d", x);

        this.setX(callee, 3040304);
    }

    function setXandSendEther(Callee _callee, uint _x) public payable {
        (uint x, uint value) = _callee.setXandSendEther{value: msg.value}(_x);
    
        console.log("setXandSendEther return = %d, ether = %d", x, value);
    }

}

contract Car {
    address public owner;
    string public model;
    address public carAddr;

    constructor(address _owner, string memory _model) payable {
        owner = _owner;
        model = _model;
        carAddr = address(this);
    }
}

contract CarFactory {
    Car[] public cars;

    function create(address _owner, string memory _model) public {
        Car car = new Car(_owner, _model);
        cars.push(car);
    }

    // contract 생성과 동시 ether 전달
    function createAndSendEther(address _owner, string memory _model) public payable {
        Car car = (new Car){value: msg.value}(_owner, _model);
        cars.push(car);
    }

    // address 생성을 salt값을 추가하여 생성한다.
    function create2(address _owner, string memory _model, bytes32 _salt) public {
        Car car = (new Car){salt: _salt}(_owner, _model);
        cars.push(car);
    }

    function create2AndSendEther(address _owner, string memory _model, bytes32 _salt) public payable {
        Car car = (new Car){value: msg.value, salt: _salt}(_owner, _model);
        cars.push(car);
    }

    function getCar(uint _index) public view returns(
        address owner,
        string memory model,
        address carAddress,
        uint balance
    ) {
        Car car = cars[_index];

        return (car.owner(), car.model(), car.carAddr(), address(car).balance);
    }
}