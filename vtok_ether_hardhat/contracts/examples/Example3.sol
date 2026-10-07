// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/// @title struct 문법 사용 예시
contract Todos {

    struct Todo {
        string text;
        bool completed;
    }

    Todo[] public todos;

    function create(string memory _text) public {
        
        // 암시적 전달
        //todos.push(Todo(_text, false));

        // 명시적 전달
        todos.push(Todo({text: _text, completed: false}));
    
        // 객체 생성 후 초기화 
        /*
        Todo memory todo;
        todo.text = _text;

        todos.push(todo);
        */
    }

    function get(uint _index) public view returns (string memory text, bool completed) {
        Todo storage todo = todos[_index];
        return (todo.text, todo.completed);
    }

    function update(uint _index, string memory _text) public {
        Todo storage todo = todos[_index];
        todo.text = _text;
    }

    function toggleCompleted(uint _index) public {
        Todo storage todo = todos[_index];
        todo.completed = !todo.completed;
    }
}

/// @title Data Location (Stroage, memory, calldata 키워드)
contract DataLocations {
    uint[] public arr;
    mapping(uint => address) private map;

    struct MyStruct {
        uint foo;
    }

    mapping(uint => MyStruct) private myStructs;

    constructor() {
        arr.push(1000);
        map[10] = msg.sender;
        myStructs[0] = MyStruct(5000);
        myStructs[1] = MyStruct(5);
    }

    function f(address sometineAddr) public {

        _f(arr, map, sometineAddr, myStructs[1]);

        for(uint i = 0; i < arr.length; i++)
        {
            console.log("[%d] - %d", i, arr[i]);
        }

        console.log("map[5] address = \"%s\"", map[5]);
        console.log("map[10] address = \"%s\"", map[10]);

        console.log("myStruct[1].foo = %d",myStructs[1].foo);

        // storage 변수
        // MyStruct storage myStruct = myStructs[1];

        // memory 변수
        // MyStruct memory myMemStruct = MyStruct(0);
    }

    function g() public view {

        console.log("before g");
        for(uint i = 0 ; i < arr.length ; i++)
        {
            console.log("arr[%d] = %d", i, arr[i]);
        }

        _g(arr);
    
        console.log("after g");
        for(uint i = 0 ; i < arr.length ; i++)
        {
            console.log("arr[%d] = %d", i, arr[i]);
        }

    }

    // 내부 상태 변수 참조로 매개변수를 받아온다.
    // 내부에서 매개변수 수정이 되면 내부 상태 변수도 변경 됨(조심)
    function _f(uint[] storage _arr, 
                mapping(uint => address) storage _map,
                address addr, 
                MyStruct storage _myStruct
    ) internal {
        _arr.push(10);
        _arr.push(20);

        _map[5] = addr;
        _myStruct.foo = 90000;
    }

    // memory 변수 전달 받은 매개변수 push 안됨
    function _g(uint[] memory _arr) private view {

        // memory 변수로 전달받은 매개변수는 push 수행 못함
        //_arr.push(10000);

        _arr[0] = 1;
        _arr[1] = 2;
        _arr[2] = 3;

        console.log("in _g");
        for(uint i = 0 ; i < _arr.length ; i++)
        {
            console.log("arr[%d] = %d", i, _arr[i]);
        }

    }

    // extranl 함수는 강제적으로 매개변수가 calldata이다..
    // calldata는 수정 불가능하며, 지속성이 없음. (memory 처럼 작동)
    function h(uint[] calldata _arr) external {

    }
}

/// @title 함수 반환값 방법에 대한 예제 코드
contract Function {
    
    uint[] public arr;
    
    constructor() {
        arr.push(1);
        arr.push(2);
        arr.push(3);
        arr.push(4);
    }

    function returnMany() public pure returns (uint, bool, uint) {
        return (1, true ,2);
    }

    function named() public pure returns (uint x, bool b, uint y) {
        return (1, true, 2);
    }

    function assigned() public pure returns (uint x, bool b, uint y) {
        x = 1;
        b = true;
        y = 2;
    }

    function destructAssigments() public pure returns (uint, bool, uint, uint, uint) {

        (uint i, bool b, uint j) = returnMany();
        
        // 특정 변수 생략은 빈칸으로 놔두면 된다..
        (uint x, ,uint y) = (4,5,6);

        return (i, b, j, x, y);
    }

    function arrayInput(uint[] memory _arr) public {}

    function arrayOutput() public view returns (uint[] memory) {
        return arr;
    }
}

/// @title view함수와 pure 함수에 대한 예제 코드
contract ViewAndPure {

    uint public x = 1;

    // storage 변수에 대해 읽기만 수행
    function addToX(uint _y) public view returns (uint) {
        return x + _y;
    }

    // storage 변수에 대해서 쓰거나 읽기를 수행하지 않는 함수
    function add(uint _i, uint _j) public pure returns (uint) {
        return _i + _j;
    }
}

/// @title error 처리 관련 예제 (revert, require, assert에 대해 알아보자)
contract Error {
    
    uint public num;

    // 조건에 부합하지 않으면 에러를 발생시키고, Gas를 환불 시켜준다.
    // 실행 안된 만큼 Gas 환불
    function testRequire(uint _i) public pure {
        require(_i > 10, "Input must be greater than 10");
    }

    // 조건 없이 에러를 발생 시키고, Gas를 환불 시켜준다.
    // 실행이 안된 만큼 Gas 환불
    function testRevert(uint _i) public pure {
        if(_i <= 10) {
            revert("Input must be greater than 10");
        }
    }

    // gas 를 소비 한 후, 특정 조건에 부합하지 않으면 에러를 발생시킨다.
    // 0.8.0 이후에는 reuiqre과 비슷하게 동작??
    // 테스트 용도로만 사용하자.
    function testAssert() public view {
        assert(num == 0);
    }

    // custom error
    error InsufficientBalance(uint balance, uint withdrawAmount);

    function testCustomError(uint _withDarwAmount) public view {
        uint bal = address(this).balance;
        if(bal < _withDarwAmount) {
            revert InsufficientBalance({balance: bal, withdrawAmount: _withDarwAmount});
        }
    }
}

/// @title error 처리 사용 예시
contract Account {
    uint public balance;
    uint public constant MAX_UNIT = 2**256 - 1;

    function deposit(uint _amount) public {
        uint oldBalance = balance;
        uint newBalance = balance + _amount;

        require(newBalance >= oldBalance, "Overflow");

        balance = newBalance;

        assert(balance >= oldBalance);
    }

    function withdraw(uint _amount) public {
        uint oldBalance = balance;

        require(balance >= _amount, "Underflow");

        if(balance < _amount) {
            revert("underflow");
        }

        balance -= _amount;
        assert(balance <= oldBalance);
    }
}

/// @title 수정자 적용 예시
contract FunctionModifer {

    /// _; 실제 함수가 실행 되는 부분이다!!

    address public owner;
    uint public x = 30;
    bool public locked;

    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {

        require(msg.sender == owner, "Not Owner");
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "not valid address");
        _;
    }

    function changeOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {
        owner = _newOwner;
    }

    modifier noReentrancy() {
        require(locked == false, "No reentrancy");

        locked = true;
        _;
        locked = false;
    }

    function decrement(uint _i) public noReentrancy {
        x -= 1;
        if(_i > 1) {
            decrement(_i - 1);
        }
    }
}