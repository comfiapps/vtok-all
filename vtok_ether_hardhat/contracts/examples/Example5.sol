//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


/// @dev Caller에서 호출하는 Contract
contract Receiver {
    event Recevied(address caller, uint amount, string message);

    receive() external payable {
        console.log("Receive was called");
        console.log("sender = %s", msg.sender);
        console.log("value = %d", msg.value);


        emit Recevied(msg.sender, msg.value, "Receive was called");
    }

    fallback() external payable {
        console.log("Fallback was called");
        console.log("sender = %s", msg.sender);
        console.log("value = %d", msg.value);

        emit Recevied(msg.sender, msg.value, "Fallback was called");
    }

    function foo(string memory _message, uint _x) public payable returns (uint) {
        emit Recevied(msg.sender, msg.value, _message);

        return _x + 1;
    }
}

/// @dev Receiver Contract call 호출
/// 다른 컨트랙트 함수 호출하는 방법 (1)
contract Caller {
    event Response(bool success, bytes data);

    function testCallFoo(address payable _addr) public payable {

        console.log("call testCallFoo");
        
        // receive external payable 호출 된!!
        //(bool success, bytes memory data) = _addr.call{value: msg.value}(""); 

        // 해당 호출 방식은 LowLevel로 호출하는 방식이다.
        // 특정함수 호출로 call을 하면 receive() external payble 호출 안된다!!!
        (bool success, bytes memory data) = _addr.call{value: msg.value, gas: 5000}(
            abi.encodeWithSignature("foo(string,uint256)", "call foo", 123)
        );

        emit Response(success, data);
    }

    function testCallDoesNotExist(address _addr) public {

        console.log("call testCallDoesNotExist");

        (bool success, bytes memory data) = _addr.call(
            abi.encodeWithSignature("doesNotExist()")
        );

        emit Response(success, data);
    }
}

/// @dev delegateCall 호출 당하는 컨트렉트
contract DelegateContract {

    uint public num;
    address public sender;
    uint public value;

    function setVars(uint _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}

/// @dev delegateCall 호출하는 컨트렉트
/// DelegateContract를 delegateCall로 호출 시 DelegateContract의 Storage를 변경시키지 않는다.
/// DelegateContract 코드만 DelegateCaller 에서 실행한다.
contract DelegateCaller {

    uint public num;
    address public sender;
    uint public value;

    function setVars(address _contract, uint _num) public payable {

        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );

        console.log("DelegateCaller success = ", success);
        console.logBytes(data);
    }

}


/// @dev Function Selector
contract FunctionSelector {

    function getSelector(string calldata _func) external view {
        bytes4 funcId = bytes4(keccak256(bytes(_func)));
        console.logBytes4(funcId);
    }
}
