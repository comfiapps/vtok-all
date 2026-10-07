//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExampleVtoken1 is ERC20 {

    // 1token = 1 * (10 ** decimals)
    constructor(uint256 initialSupply) ERC20("VtokenEx1", "VTKEX1") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}