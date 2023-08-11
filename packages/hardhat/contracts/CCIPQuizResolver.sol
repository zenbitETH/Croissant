// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title AttestationResolver
contract CCIPQuizResolverSender is AccessControl {
    error OutOfBounds();

    uint256 private secret;
    uint256 public quizId;

    constructor(uint256 _secret) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        secret = _secret;
    }

    struct Quiz {
        string[] questions;
        // encoded and Hashed Answers
        bytes32 answers;
    }

    struct User {
        string userAnswers; 
        bool isCorrect; 
    }
    
    mapping (uint256 => Quiz) public idToQuiz;
    mapping (address => User) public addressToUser;

    function computeAnswers(string memory _answers) private view returns (bytes32) {
        return keccak256(abi.encodePacked(_answers, secret));
    }

    function createQuiz(string[] memory _questions, string memory _answers) public onlyRole(DEFAULT_ADMIN_ROLE) {
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
