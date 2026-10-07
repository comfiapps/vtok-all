//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HashFunction {
    function hash(string memory _text, uint _num, address _addr) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_text, _num, _addr));
    }

    function collision(string memory _text, string memory _anotherText) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_text, _anotherText));
    }

}

contract GuessTheMagicWord {
    bytes32 public answer = 0x60298f78cc0b47170ba79c10aa3851d7648bd96f2f8e46a19dbc777c36fb0c00;

    function guess(string memory _word) public view returns (bool) {
        return keccak256(abi.encodePacked(_word)) == answer;
    }
}

contract VerifySignature {
    
}

contract OverflowTest {
    uint16 private constant MAX_VALUE = 0;//uint16(0xffff);

    uint16 private _currentValue;

    event Log(uint value);

    constructor() {
        _currentValue = MAX_VALUE;
    }

    function currValue() public view returns (uint16) {
        return _currentValue;
    }
 
    function decrement() public returns (uint16) {
        _currentValue = _sub(_currentValue, 1);
        return _currentValue;
    }

    function increment() external returns (uint16) {
       _currentValue = _add(_currentValue, 1);
        return _currentValue;
    }

    // 0.8.0 부터는 overflow/underflow 발생할 경우 revert 동작을 한다!! 중요!
    function _add(uint16 lhs, uint16 rhs) pure private returns (uint16) {
        unchecked {
            return lhs + rhs; 
        }
        
    } 

    function _sub(uint16 lhs, uint16 rhs) pure private returns (uint16) {
        unchecked {
            return lhs - rhs;
        }
    } 
}