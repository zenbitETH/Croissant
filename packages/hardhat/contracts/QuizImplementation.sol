// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
// import "./SchemaRegistry.sol";
import {ISchemaRegistry, SchemaRecord} from "./ISchemaRegistry.sol";

/// @title Quiz Contract and Schema Registry
contract QuizImplementation is AccessControl, ISchemaRegistry {
    error OutOfBounds();
    error AlreadyExists();

    uint256 private secret;
    uint256 public quizId;
    // A representation of an empty/uninitialized UID.
    bytes32 constant emptyUID = 0;

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

    // The global mapping between schema records and their IDs.
    mapping(bytes32 uid => SchemaRecord schemaRecord) private _registry;
    mapping(uint256 => Quiz) public idToQuiz;
    mapping(address => User) public addressToUser;

    function computeAnswers(string memory _answers) private view returns (bytes32) {
        return keccak256(abi.encodePacked(_answers, secret));
    }

    function createQuiz(string[] memory _questions, string memory _answers) public onlyRole(DEFAULT_ADMIN_ROLE) {
        idToQuiz[quizId].questions = _questions;
        idToQuiz[quizId].answers = computeAnswers(_answers);
        quizId++;
    }

    function updateQuiz(uint256 _quizId, string[] memory _questions, string memory _answers)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
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

    function _checkAnswers(uint256 _quizId, string memory _userAnswers) private returns (bool) {
        if (idToQuiz[_quizId].answers == keccak256(abi.encodePacked(_userAnswers, secret))) {
            return true;
        } else {
            return false;
        }
    }

    function register(string calldata schema, bool revocable) external returns (bytes32) {
        SchemaRecord memory schemaRecord = SchemaRecord({uid: emptyUID, schema: schema, revocable: revocable});

        bytes32 uid = _getUID(schemaRecord);
        if (_registry[uid].uid != emptyUID) {
            revert AlreadyExists();
        }

        schemaRecord.uid = uid;
        _registry[uid] = schemaRecord;

        emit Registered(uid, msg.sender);

        return uid;
    }

    /// @inheritdoc ISchemaRegistry
    function getSchema(bytes32 uid) external view returns (SchemaRecord memory) {
        return _registry[uid];
    }

    /// @notice Calculates a UID for a given schema.
    /// @param schemaRecord The input schema.
    /// @return schema UID.
    function _getUID(SchemaRecord memory schemaRecord) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(schemaRecord.schema, schemaRecord.revocable));
    }
}
