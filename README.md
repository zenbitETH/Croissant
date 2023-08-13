# 🥐 Croissant
Proof of concept of cross-chain attestations for web3 onboarding. [Developed at Superhack 2023](https://ethglobal.com/showcase/croissant-870b0)  

![alt text](https://storage.googleapis.com/ethglobal-api-production/projects%2F870b0%2Fimages%2F4.png)

## Project Description

In the Web3 community, projects use different tools across multiple chains and off-chain platforms to engage with users. This has resulted in fragmentation in solutions that provide funding and certification for these projects' impact and can leave them vulnerable to Sybil attacks.

Croissant integrates multiple web3 technologies into a public good that helps communities to register onchain the impact created by onboarding new users with crosschain attestations.

Users can fork Croissant to easily manage their communities and customize the onboarding experience with the Team and Quiz manager, a dashboard where users can assign admins from logged members, set the URL for the tutorial video, and set the Q&A to verify user learning from the content.

Once the admins set Croissant, members can take the tutorial, answer the quiz, verify their personhood with WorldID along with their answers, and get a crosschain onboarding attestation (Optimism and Sepolia) if they have responded correctly.

## How it's Made

Croissant is built with the following web3 technologies and public goods:

- [ScaffoldETH2](https://github.com/scaffold-eth/scaffold-eth-2) repo for the Dapp template
- [M.Piedrafita's](https://github.com/m1guelpf/armchair) Armchair repo for the Team Dashboard template
- Contracts deployed in [Optimism](https://www.optimism.io/) Goerli and [Sepolia](https://sepolia.dev/)
- Onboarding attestation schema registered in [Ethereum Attestation Service](https://attest.sh/)
- [WorldId](https://worldcoin.org/world-id) as Sybil-Defence solution
- [Chainlink](https://chain.link/cross-chain) CCIP for the crosschain interactions
- [The Graph](https://thegraph.com/es/) for the contracts subgraph

## Contracts

1. [CCIPSenderOptimism](https://goerli-optimism.etherscan.io/address/0xd2D9De2c40D1A49f7247165284cea27a1BEAa272)
2. [CCIPReceiverSepolia](https://sepolia.etherscan.io/address/0x8a60871E8E822BA8f66899Fb079990293e9C0CB5#code)
3. [Chainlink CCIP](https://ccip.chain.link/msg/0x9be2f2e094403fa1527e72cfaf651a1b3757890fb0bd0bdea3258ef7d7452ff3)

## User Flow
![User Flow](https://media.discordapp.net/attachments/1138818797395001417/1140153879686815794/Screenshot_2023-08-12_at_23.23.35.png?width=1440&height=767)