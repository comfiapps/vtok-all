//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Counter {
    uint public count;

    function get() public view returns (uint) {
        return count;
    }

    function inc() public {
        count++;
    }

    function dec() public {
        count--;
    }
}

contract Variables {
    string public text = "hello";
    uint public num = 123;

    uint public constant MY_CONST_VALUE = 12312412;

    function doSomething() public view {
        uint i = 456; // memory

        uint timestamp = block.timestamp;
        address sender = msg.sender;

        console.log("timestamp = \"%s\"", timestamp);
        console.log("address = \"%s\"", sender);
    }
}

/// @title immutable semantic
contract Immutable {

    address public immutable MY_ADDRESS;
    uint public immutable MY_UNIT;  // constructor에서 초기화 해야 한다. (constant와 비슷)

    constructor(uint _myUint) {
        MY_ADDRESS = msg.sender;
        MY_UNIT = _myUint;
    }
}

/// @title get/set semantic
contract SimpleStorage {

    event Log(uint num);

    uint public num;

    function set(uint _num) public {
        num = _num;

        emit Log(num);
    }

    function get() public view returns (uint) {
        return num;
    }
}

/// @title ether to wei semantic
contract EtherUnits {
    uint public ownWei = 1 wei;
    bool public isOneWie = 1 wei == 1;
    uint public oneEther = 1 ether;
    bool public isOneEhter = 1 ether == 1e18;
    //1000000000000000000

    constructor() {
        console.log(oneEther);
    }
}

/// @title if else semantic
contract IfElse {

    function foo(uint _x) public pure returns (uint) {
        if(_x < 10) {
            return 0;
        }
        else if(_x < 20) {
            return 1;
        }
        else {
            return 2;
        }
    }

    function ternary(uint _x) public pure returns (uint) {
        return _x < 10 ? 1 : 2;
    }
}

/// @title  Loop semantic
contract Loop {
    function loop() public view {

        for(uint i = 0 ; i < 10 ; i++)
        {
            if(i == 3) {
                continue;
            }

            if(i == 5) {
                break;
            }

            console.log("value is %d", i);
        }

        uint j = 0;
        while(j < 10) {
            j++;
        }

        console.log("while value is %d", j);
    }
}