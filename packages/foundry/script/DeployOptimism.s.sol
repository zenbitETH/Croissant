// script/CCIPSender_Unsafe.s.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import {CCIPSenderOptimism} from "../src/CCIPSenderOptimism.sol";

contract DeployOptimism is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address OLink = 0xdc2CC710e42857672E7907CF474a69B63B93089f;
        address ORouter = 0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26;

        CCIPSenderOptimism sender = new CCIPSenderOptimism(
            OLink,
            ORouter,
            993
        );

        console.log(
            "CCIPSender deployed to ",
            address(sender)
        );

        vm.stopBroadcast();
    }
}