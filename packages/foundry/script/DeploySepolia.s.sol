// script/CCIPReceiver_Unsafe.s.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import {CCIPReceiverSepolia} from "../src/CCIPReceiverSepolia.sol";

contract Deploy is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address sepoliaRouter = 0xD0daae2231E9CB96b94C8512223533293C3693Bf;

        CCIPReceiverSepolia receiver = new CCIPReceiverSepolia(
            sepoliaRouter,
            993
        );

        console.log("CCIPReceiverSEPOLIA deployed to ", address(receiver));

        vm.stopBroadcast();
    }
}
