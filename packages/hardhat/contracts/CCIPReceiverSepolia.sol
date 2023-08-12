// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract CCIPReceiverSepolia is CCIPReceiver {
    address public latestSender;
    string public latestMessage;

    constructor(address router) CCIPReceiver(router) {}

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        latestSender = abi.decode(message.sender, (address));
        latestMessage = abi.decode(message.data, (string));
    }

    // function registerUserAnswers(uint256 _quizId, string memory _userAnswers) public {
    //     addressToUser[msg.sender].userAnswers = _userAnswers;
    //     addressToUser[msg.sender].isCorrect = _checkAnswers(_quizId, _userAnswers);
    // }

    // function _checkAnswers(uint256 _quizId, string memory _userAnswers) private view returns (bool) {
    //     if (idToQuiz[_quizId].answers == keccak256(abi.encodePacked(_userAnswers, secret))) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}
