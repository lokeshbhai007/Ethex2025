// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {
    address public sender;
    address public receiver;
    bool public senderAck;
    bool public receiverAck;

    constructor() {
        sender = address(0);
        receiver = address(0);
    }

    function deposit(address _receiver) external payable {
        require(sender == address(0), "Deposit already exists!");
        require(msg.value > 0, "Deposit amount must be greater than 0");
        
        sender = msg.sender;
        receiver = _receiver;
    }

    function acknowledgeReceipt() external {
        require(msg.sender == receiver, "Only receiver can acknowledge");
        receiverAck = true;
    }

    function releaseFund() external {
        require(senderAck && receiverAck, "Both parties must acknowledge");
        require(receiver != address(0), "No receiver assigned");

        payable(receiver).transfer(address(this).balance);

        // Reset contract
        sender = address(0);
        receiver = address(0);
        senderAck = false;
        receiverAck = false;
    }
}
