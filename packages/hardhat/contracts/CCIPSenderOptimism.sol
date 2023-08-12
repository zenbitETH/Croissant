// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

contract CCIPSender {
    error OutOfBounds();

    address link;
    address router;
    uint256 private secret;
    uint256 public quizId;

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
    mapping(address => bool) public goToAttest;

    constructor(address _link, address _router, uint256 _secret) {
        secret = _secret;
        link = _link;
        router = _router;
        LinkTokenInterface(link).approve(router, type(uint256).max);
    }

    function toBytes(bytes32 data) public pure returns (bytes memory) {
        return bytes.concat(data);
    }

    function send(address receiver, string memory _answers, uint64 destinationChainSelector) external {
        bytes memory answers = toBytes(computeAnswers(_answers));
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: answers,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: link
        });

        IRouterClient(router).ccipSend(destinationChainSelector, message);
    }

    function computeAnswers(string memory _answers) private view returns (bytes32) {
        return keccak256(abi.encodePacked(_answers, secret));
    }

    function createQuiz(string[] memory _questions, string memory _answers) public {
        idToQuiz[quizId].questions = _questions;
        idToQuiz[quizId].answers = computeAnswers(_answers);
        quizId++;
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
