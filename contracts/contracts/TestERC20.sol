//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor() ERC20("Test ERC20 Token", "TestERC20") {
        _mint(msg.sender, 1_000_000 * (10**uint256(decimals())));
    }

    uint256 constant DECIMALS = 10**18;
    uint256 constant public mintAmount = 10_000 * DECIMALS;
    uint256 constant public waitTime = 5 minutes;

    mapping(address => uint) public lockTime;

    function requestTokens() public {
        require(allowedToWithdraw(msg.sender));
        _mint(msg.sender, mintAmount);
        lockTime[msg.sender] = block.timestamp + waitTime;
    }

    function allowedToWithdraw(address _address) public view returns (bool) {
        if(lockTime[_address] == 0) {
            return true;
        } else if(block.timestamp >= lockTime[_address]) {
            return true;
        }
        return false;
    }
}
