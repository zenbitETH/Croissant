const hre = require("hardhat");

async function main() {
  
 
  const quiz = await hre.ethers.getContractFactory("QuizImplementation");
  const Quiz = await quiz.deploy(993);
  await Quiz.deployed();
  console.log(" Quiz Implementation deployed to", Quiz.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});