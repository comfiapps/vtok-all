//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

/// @title  Mapping semantic
contract Mapping {
    mapping(address => uint) public myMap;

    function get(address _addr) public view returns (uint) {
        return myMap[_addr];
    }

    function set(address _addr, uint i) public {
        myMap[_addr] = i;
    }

    function remove(address _addr) public {
        delete myMap[_addr];
    }
}

/// @title nested mapping semantic
contract NestedMapping {
    mapping(address => mapping(uint => bool)) public nested;

    function get(address _addr, uint _i) public view returns (bool) {
        return nested[_addr][_i];
    }

    function set(address _addr, uint _i, bool _b) public {
        nested[_addr][_i] = _b;
    }

    function remove(address _addr, uint _i) public {
        delete nested[_addr][_i];
    }
}

/// @title Array semantic
contract Array {

    uint[] public arr;
    uint[] public arr2 = [1,2,3];

    // 10개로 0으롤 초기화되어서 고정 배열
    uint[10] public myFiexedArr;

    function get(uint i) public view returns (uint) {
        return arr[i];
    }

    function getArr() public view returns (uint[] memory) {
        return arr;
    }

    function push(uint i) public {
        arr.push(i);
    }

    function pop() public  {
        arr.pop();
    }

    function getLength() public view returns (uint) {
        return arr.length;
    }

    function remove(uint index) public {
        // array not change length
        // array element set default value (ex. 0)
        delete arr[index];
    }

    function examples() external pure returns (uint) {
        uint[] memory a = new uint[](5);

        a[0] = 10;
        a[2] = 20;
 
        return a.length; 
    }
}

/// @title 특정 index 지우고 한칸씩 땡겨온다. (순서 중요. gas비 많이 나옴)
contract ArrayRemovebyShifting {

    uint[] public arr;

    function remove(uint _index) public {
        require(_index < arr.length, "index out of bound");

        for(uint i = _index; i < arr.length - 1; i++)
        {
            arr[i] = arr[i + 1];
        }

        arr.pop();
    }

    function test() external {
        arr = [1,2,3,4,5];

        remove(2);
        
        assert(arr[0] == 1);
        assert(arr[1] == 2);
        assert(arr[2] == 4);
        assert(arr[3] == 5);
        assert(arr.length == 4);

        arr = [1];
        remove(0);

        assert(arr.length == 0);

        console.log("array1 complete!");
    }
}

/// @title 지워지는 부분 끝에 있는 index를 넣고 pop한다. (순서 중요하지 않을 때. gas비 절약)
contract ArrayReplaceFromEnd {
    uint[] public arr;

    function remove(uint index) public {
        require(index < arr.length, "index out of boudnd");

        arr[index] = arr[arr.length - 1];
        arr.pop();
    }

    function test() public {
        arr = [1,2,3,4];

        remove(1);

        assert(arr[0] == 1);
        assert(arr[1] == 4);
        assert(arr[2] == 3);

        remove(2);

        assert(arr[0] == 1);
        assert(arr[1] == 4);
        assert(arr.length == 2);

        console.log("array2 complete!!");

    }
}

/// @title enum 문법 사용 예씨
contract Enum {

    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }

    Status public status;

    function get() public view returns (Status) {
        return status;
    }

    function set(Status _status) public {
        status = _status;
    }

    function cancel() public {
        status = Status.Canceled;
    }

    function reset() public {
        delete status;
    }
}