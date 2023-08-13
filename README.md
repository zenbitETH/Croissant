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

The main contract is the QuizImplementation that we have deployed on several blockchains: 
This contract is a standard that we have integrated with Chainlink. 

1. [CCIPSenderOptimism](https://goerli-optimism.etherscan.io/address/0xd2D9De2c40D1A49f7247165284cea27a1BEAa272)
2. [CCIPReceiverSepolia](https://sepolia.etherscan.io/address/0x8a60871E8E822BA8f66899Fb079990293e9C0CB5#code)
3. [Chainlink CCIP transaction](https://ccip.chain.link/msg/0x9be2f2e094403fa1527e72cfaf651a1b3757890fb0bd0bdea3258ef7d7452ff3)

## Integration with Mode 

Using [Mode documentation](https://docs.mode.network/get-started/bridging-to-mode-testnet) we have deployed 2 contracts to Mode by setting up a hardhat flow: 

- Steps to deploy :

We have deployed our contracts on Mode Testnet : 

Hardhat deployment steps : 

1. **Add .env file with PRIVATE_KEY**
2. **Add modeTestnet in hardhat.config.js** :

```
 modeTestnet: {
      url: "https://sepolia.mode.network",
      chainId: 919,
      accounts
    }
    .... 
    customChains: [
        {
          network: "modeTestnet",
            url: "https://sepolia.mode.network",
            chainId: 919
          }
      ]

``` 
3. Run : ```npx hardhat run deploy/deployMode.js --network modeTestnet``` 

[QuizImplementation on Mode](https://sepolia.explorer.mode.network/address/0xC075bf3F3ca75A2a655186a617B29532167f8ba0) 

## Integration with Base : 

We have also deployed on implementation in BaseGoerli : 

Hardhat deployment steps : 

1. **Add .env file with PRIVATE_KEY**
2. **Add modeTestnet in hardhat.config.js** :

  etherscan: {
      apiKey: {
        "base-goerli" :'<API_KEY>'

      },
      customChains: [
        {
          network: "base-goerli",
          chainId: 84531,
          urls: {
           apiURL: "https://api-goerli.basescan.org/api",
           browserURL: "https://goerli.basescan.org"
        }
      }
  
      ]
    
    }

3. Run : ```npx hardhat verify --network baseGoerli 0xCEBF52D371cCF3B7Bc019fD43A676B12F263D779 993``` 

[Quiz Implementation on BaseGoerli](https://goerli.basescan.org/address/0xCEBF52D371cCF3B7Bc019fD43A676B12F263D779#code)


## BASE NODES PROPOSAL 

We also have come up with a proposal for 🛠️ Base Nodes : 


Here's what we've done !! 

In the Dockerfile: [Docker File for Base](https://github.com/base-org/node/blob/main/Dockerfile) we have removed the previous op stage since we're focusing only on op-geth.
We have set the op-geth version as latest for simplicity, but you should lock it to a specific release for stability.
We have Removed the checksum for now. If you know the checksum of the specific release, you should add it back in.

- POC :

``` 
# syntax=docker/dockerfile:1-labs

FROM golang:1.19 as geth-builder

WORKDIR /app

ENV REPO=https://github.com/ethereum-optimism/op-geth
ENV VERSION=latest  # You can lock this to a specific version if desired
# Remove the checksum since it might change based on the version

ADD $REPO/archive/$VERSION.tar.gz ./

RUN tar -xvf ./$VERSION.tar.gz --strip-components=1 && \
    go run build/ci.go install -static ./cmd/geth

FROM golang:1.19

RUN apt-get update && \
    apt-get install -y jq curl && \
    rm -rf /var/lib/apt/lists

WORKDIR /app

COPY --from=geth-builder /app/build/bin/geth ./
COPY geth-entrypoint .
COPY goerli ./goerli
COPY mainnet ./mainnet

ENTRYPOINT ["./geth-entrypoint"]

``` 


In [the docker-compose.yml](https://github.com/base-org/node/blob/main/docker-compose.yml) : 

We have updated the build context and Dockerfile path and added the volume mapping as previously discussed for data persistence.


- Usage : 

1. Replace your current Dockerfile with the provided Dockerfile.
2. Update your docker-compose.yml file accordingly.
3. Build and run using Docker Compose.
**WARNING : Do note, you'd want to adjust paths, environment variables, etc. to match your specific setup and requirements. The above scripts provide a basic template and starting point. Always test in a safe environment before deploying**

- POC :

```
version: '3.8'

services:
  geth: # This will use the new op-geth
    build:
      context: .
      dockerfile: Dockerfile  # Assuming you're using the above Dockerfile
    ports:
      - 8545:8545       # RPC
      - 8546:8546       # websocket
      - 30303:30303     # P2P TCP (currently unused)
      - 30303:30303/udp # P2P UDP (currently unused)
      - 7301:6060       # metrics
    command: [ "sh", "./geth-entrypoint" ]
    volumes:
      - /path/to/local/geth-data:/root/.ethereum
    env_file:
      # select your network here:
      # - .env.goerli
      # - .env.mainnet

```

## User Flow
![User Flow](https://media.discordapp.net/attachments/1138818797395001417/1140153879686815794/Screenshot_2023-08-12_at_23.23.35.png?width=1440&height=767)
