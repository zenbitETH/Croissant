opti : 0xEd017D2931C2294C1093836BAdF9e9c9E2DA9595
sepolia : 0x43f8f2648e0B09b8c09313118C04B20Ed2D8626c




forge script ./script/DeploySepolia.s.sol:Deploy --rpc-url ethereumSepolia --etherscan-api-key $ETHERSCAN_API_KEY --broadcast --legacy --verify

forge script ./script/DeployOptimism.s.sol:DeployOptimism --rpc-url opti --etherscan-api-key $OPTIMISM_RPC_URL --broadcast --legacy --verify


> cast send 0xd2D9De2c40D1A49f7247165284cea27a1BEAa272 --rpc-url opti --gas-price 326095 --private-key=$PRIVATE_KEY "send(address,string,uint64)" 0x8a60871E8E822BA8f66899Fb079990293e9C0CB5 "12" 16015286601757825753 