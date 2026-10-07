// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/// @title : emit 이벤트 발생 예제 (사용 되는 부분이 중요하다 [example4-scirpt.js, example4-test.js])
contract Event {

    event Log(address indexed sender, string message);
    event AnotherLog();

    function test() public {
        emit Log(msg.sender, "Hello world!");
        emit Log(msg.sender, "Hello EVM!!");

        emit AnotherLog();
    }
}

// constructor 예제
//////////////////////////

/// @title 생성자가 있는 contract를 상속 하였을 경우 초기화 하는 방법들
contract X {
    string public name;
    
    constructor(string memory _name) {
        name = _name;
    }
}

contract Y {
    string public text;

    constructor(string memory _text) {
        text = _text;
    }
}

/// @dev 선언과 동시에 생성자 매개변수 넘겨 주기
contract WW is X("Input to X"), Y("Input to Y") {
}

/// @dev 자식 생성자로부터 부모 생성자 매개변수 넘겨 주기
contract XX is X, Y {

    constructor(string memory _name, string memory _text) X(_name) Y(_text) {}

}

/// @dev 생성자 호출 순서 Y, X, E
contract YY is X, Y {
    constructor() X("X was Called") Y("Y was called") {}
}

/// @dev 생성자 호출 순서 Y, X, E
contract ZZ is X, Y {
    constructor() Y("Y was called") X("X was called") {}
}

// 다중 상속에서 함수 호출
//////////////////////////
// 다중 상속에서 가상 함수 호출 순서는
// 1. 오른쪽부터 왼쪽으로

contract A {
    function foo() public pure virtual returns (string memory) {
        return "A";
    }
}

contract B is A {

    // override A.foo()
    function foo() public pure virtual override returns (string memory) {
        return "B";
    }
}

contract C is A {

    // override A.foo()
    function foo() public pure virtual override returns (string memory) {
        return "C";
    }
}

contract D is B, C {

    // result "C"
    function foo() public pure override(B, C) returns (string memory) {
        return super.foo();
    }
}

contract E is C, B {

    // result "B"
    function foo() public pure override(C, B) returns (string memory) {
        return super.foo();
    }
}

/// @dev B, A 순으로 상속을 했다면, compilation 에러가 발생한다.
/// 상속 순서는 Most base-like 에서 most derived 순서로...
contract F is A, B {
    
    // result "B"
    function foo() public pure override(A, B) returns (string memory) {
        return super.foo();
    }
}

/// 상속 후 부모 상태 변수
/////////////////////////////////

contract Parent {
    string public name = "Contract Parent";

    function getName() public view returns (string memory) {
        return name;
    }
}

contract Child is Parent {

    // 부모의 상태 변수를 override 한다.
    constructor() {
        name = "Contract C";
    }
}

/// 상속 후 부모 함수 호출 하기
contract Parent_A {
    event Log(string message);

    function foo() public virtual {
        emit Log("Parent_A.foo() cllaed");
    }

    function bar() public virtual {
        emit Log("Parent_A.bar() cllaed");
    }
}

contract Child_B is Parent_A {

    function foo() public virtual override {
        emit Log("Child_B.foo() called");
        Parent_A.foo();
    }

    function bar() public virtual override {
        emit Log("Child_B.bar() called");
        super.bar();
    }
}

contract Child_C is Parent_A {
    function foo() public virtual override {
        emit Log("Child_C.foo() called");
        Parent_A.foo();
    }

    function bar() public virtual override {
        emit Log("Child_C.bar() called");
        super.bar();
    }
}

contract Child_D is Child_B, Child_C {

    // Child_C.foo(), Parent_A.foo() 호출함
    function foo() public override(Child_B, Child_C) {
        super.foo();
    }

    // Child_C.foo(), Child_B.foo(), Parent_A.foo() 호춯함
    function bar() public override(Child_B, Child_C) {
        super.bar();
    }
}

/// Visibility (scirpt 에제 없음)
///////////////////////

contract Base {

    // 자식에서 호출 불가
    string private privateVar = "private variable";
    
    // 자식에서 호출 가능
    string internal internalVar = "internal variable";
    
    // 어디서든 호출 가능
    string public publicVar = "public variable";

    // 외부, 자식에서 호출 할 수 없다. (오로지 자신)
    function privateFunc() private pure returns (string memory) {
        return "private function called";
    }

    function testPrivateFunc() public pure returns (string memory) {
        return privateFunc();
    }

    // 외부에서만 호출 할 수 없다. (자식에서 호출 가능)
    function internalFunc() internal pure returns (string memory) {
        return "internal function called";
    }

    function testInternalFunc() public pure virtual returns (string memory) {
        return internalFunc();
    }
    
    function publicFunc() public pure returns (string memory) {
        return "public function called";
    }

    // 외부에서만 호출 가능
    function externalFunc() external pure returns (string memory) {
        return "extnerla function called";
    }
}

/// interface (scirpt 예제 없음)
///////////////////////

contract CounterImp {
    uint public count;

    function increment() external {
        count += 1;
    }
}

interface ICounter {
    function count() external view returns (uint);

    function increment() external;
}

contract MyContract {
    function incrementCounter(address _counter) external {
        ICounter(_counter).increment();
    }

    function getCount(address _counter) external view returns (uint) {
        return ICounter(_counter).count();
    }
}

interface UniswapV2Factory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

interface UniswapV2Pair {
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampList);
}

contract UniswapExample {
    address private factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address private weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    function getTokenReserves() external view returns (uint, uint) {
        address pair = UniswapV2Factory(factory).getPair(dai, weth);
        (uint reserve0, uint reserve1, ) = UniswapV2Pair(pair).getReserves();

        return (reserve0, reserve1);
    }
}