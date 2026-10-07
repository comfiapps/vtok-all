//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Foo {
    address public owner;

    constructor(address _owner) {
        require(_owner != address(0), "invalid address");
        assert(_owner != 0x0000000000000000000000000000000000000001);
        owner = _owner;
    }

    function myFunc(uint _x) public pure returns (string memory) {
        require(_x != 0, "require falied");

        return "my func was called";
    }
}

/// @dev try catch 사용 예시
contract Bar {
    event Log(string message);
    event LogBytes(bytes data);

    Foo public foo;

    constructor() {
        foo = new Foo(msg.sender);
    }

    function tryCatchExternalCall(uint _i) public {
        try foo.myFunc(_i) returns (string memory result) {
            emit Log(result);
        }
        catch {
            emit Log("external call failed");
        }
    }

    function tryCatchNewContract(address _owner) public {
        try new Foo(_owner) returns (Foo createFoo) {

            createFoo.myFunc(100);

            emit Log("Foo created");
        }
        // require는 이부분으로 catch 된다.
        catch Error(string memory reason) {
            emit Log(reason);
        }
        // assert는 이부분으로 catch 된다.
        catch (bytes memory reason) {
            emit LogBytes(reason);
        }
    }

}


/// @dev Import
/// Import from external Github url
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.3/contracts/cryptography/ECDSA.sol";


/// @dev Library 다루기 예시

library SafeMath {
    function add(uint x, uint y) internal pure returns (uint) {
        uint z = x + y;
        require(z >= x, "uint overflow");

        return z;
    }
}

library Math {
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x + (y / x + y) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}

contract TestSafeMath {
    using SafeMath for uint;

    uint public MAX_UINT = 2**256 - 1;

    function testAdd(uint x, uint y) public pure returns (uint) {
        return x.add(y);
    }

    function testSquareRoot(uint x) public pure returns (uint) {
        return Math.sqrt(x);
    }
}

library ArrayLib {
    function remove(uint[] storage arr, uint index) public {
        require(arr.length > 0, "Can't remove from empty array");

        arr[index] = arr[arr.length - 1];
        arr.pop();
    }
}

contract TestArray {
    using ArrayLib for uint[];

    uint[] public arr;

    function testArrayRemove() public {

        for(uint i = 0; i < 3 ; i++) {
            arr.push(i);
        }

        arr.remove(1);

        for(uint i = 0 ; i < arr.length; i++) {
            console.log('arr[%d] = %d', i, arr[i]);
        }
    }
}
