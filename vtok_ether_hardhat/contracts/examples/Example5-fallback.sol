// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/// @dev ether는 보내고 받는 부분은 address, function에 payable을 수정자를 사용해야 하는가??
contract Payable {

    // owner address는 contract 내에서 ether를 받을 수 있다.
    address payable public owner;

    // payable 주소 할당??
    constructor() payable {
        owner = payable(msg.sender);
    }

    function deposit() public payable {}

    function notPayable() public {}

    function withdraw() public {
        
        // 해당 컨트렉트에 저장 된 ether의 양
        uint amount = address(this).balance;

        (bool success, ) = owner.call{value: amount}("");
        require(success == true, "Failed to send Ether");
    }

    function transfer(address payable _to, uint _amount) public {
        (bool success, ) = _to.call{value: _amount}("");

        require(success == true, "Failed to send Ether");
    }
}

/// @dev 이더를 받는 계약은 아래 기능 중 하나 이상을 가져야 한다.
/// receive() external payable {}
/// fallback() external payable {}
contract ReceiveEther {
    
    // 1. send Ether
    // if msg.data is empty
    //   - if receive() 가 존재 하는가?
    //     - receive() 호출
    //   - else 
    //     - fallback() 호출
    // else
    //   - fallback() 호출

    // 컨트렉트가 순수하게 이더만 받을 떄 작동한다.
    receive() external payable {
        console.log("receive ether");
    }

    // 
    fallback() external payable {
        console.log("call fallbck");
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

/// @dev 이더를 보내는 계약
contract SendEther {
    function sendViaTransfer(address payable _to) public payable {
        // 해당 기능은 ether 전송에 대해 권장하지 않는 방법.
        _to.transfer(msg.value);
    }

    function sendViaSend(address payable _to) public payable {

        // 해당 기능은 ether 전송에 대해 권장하지 않는 방법.
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
    }

    function sendViaCall(address payable _to) public payable {

        console.log("sendViaCall");

        // 현재 권장하고 있는 방법
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed tosend Ether");
    }
}

contract Fallback {
    event Log(uint gas);

    fallback() external payable {
        emit Log(gasleft());
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract SendToFallback {
    function transferToFallback(address payable _to) public payable {
        _to.transfer(msg.value);
    }

    function callFallback(address payable _to) public payable {
        
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed tot send Ether");
    }
}