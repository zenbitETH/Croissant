// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract CCIPReceiverSepolia is CCIPReceiver {
    uint256 private secret;
    uint256 public quizId;

    uint64 latestSourceChainSelector;
    bytes32 latestMessageId;
    address public latestSender;
    string public latestMessage;

    event MessageReceived(
        bytes32 latestMessageId, uint64 latestSourceChainSelector, address latestSender, string latestMessage
    );

    struct Quiz {
        string[] questions;
        // encoded and Hashed Answers
        bytes32 answers;
    }

    struct User {
        string userAnswers;
        bool isCorrect;
    }

    mapping(uint256 => Quiz) public idToQuiz;
    mapping(address => User) public addressToUser;
    // mapping(address => bool) public goToAttest;
    mapping(address => bool) public isAdmin;

    receive() external payable {}

    constructor(address router, uint256 _secret) CCIPReceiver(router) {
        isAdmin[msg.sender] = true;
        secret = _secret;
    }

    function addAdmin(address _admin) public {
        require(isAdmin[msg.sender] == true, "Admin Access is required");
        isAdmin[_admin] = true;
    }

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        latestMessageId = message.messageId;
        latestSourceChainSelector = message.sourceChainSelector;
        latestSender = abi.decode(message.sender, (address));
        latestMessage = abi.decode(message.data, (string));

        emit MessageReceived(latestMessageId, latestSourceChainSelector, latestSender, latestMessage);
    }

    function getLatestMessageDetails() public view returns (bytes32, uint64, address, string memory) {
        return (latestMessageId, latestSourceChainSelector, latestSender, latestMessage);
    }

    function computeAnswers(string memory _answers) private view returns (bytes32) {
        return keccak256(abi.encodePacked(_answers, secret));
    }

    function createQuiz(string[] memory _questions, string memory _answers) public {
        require(isAdmin[msg.sender] == true, "Admin Access is required");
        idToQuiz[quizId].questions = _questions;
        idToQuiz[quizId].answers = computeAnswers(_answers);
        quizId++;
    }

    function updateQuiz(uint256 _quizId, string[] memory _questions, string memory _answers) public {
        require(isAdmin[msg.sender] == true, "Admin Access is required");
        idToQuiz[_quizId].questions = _questions;
        idToQuiz[_quizId].answers = computeAnswers(_answers);
    }

    // for fetching Questions with a particular QuizId
    function fetchQuestions(uint256 _quizId) public view returns (string[] memory) {
        return idToQuiz[_quizId].questions;
    }

    function registerUserAnswers(uint256 _quizId, string memory _userAnswers) public {
        addressToUser[msg.sender].userAnswers = _userAnswers;
        addressToUser[msg.sender].isCorrect = _checkAnswers(_quizId, _userAnswers);
    }

    function _checkAnswers(uint256 _quizId, string memory _userAnswers) private view returns (bool) {
        if (idToQuiz[_quizId].answers == keccak256(abi.encodePacked(_userAnswers, secret))) {
            return true;
        } else {
            return false;
        }
    }
}