const Migrations = artifacts.require("Migrations");
const XYZ = artifacts.require("XYZ");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(XYZ);

  const tokenMock = await XYZ.deployed()

  // Mint 1,000 Dai Tokens for the deployer
  await tokenMock.mint(
    '0x847d2827188fA5Da7b4b20AaA3d5BbB449Cf0AFb',
    '10000000000000000000000'
  )
};
