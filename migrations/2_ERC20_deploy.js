const ERC20PresetFixedSupplyUpgradeable = artifacts.require("ERC20PresetFixedSupplyUpgradeable");

module.exports = async function(deployer, network, accounts) {
   await deployer.deploy(ERC20PresetFixedSupplyUpgradeable);
   const erc20 = await ERC20PresetFixedSupplyUpgradeable.deployed();
};
