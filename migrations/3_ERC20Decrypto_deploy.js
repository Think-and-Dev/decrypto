const ERC20Decrypto = artifacts.require("ERC20Decrypto");
const TransparentUpgradeableProxy = artifacts.require("TransparentUpgradeableProxy");
const deployHelper = require("../deployed/deployHelper");

module.exports = async function(deployer, network, accounts) {
   const deployedJson = deployHelper.getDeployed(network);
   const isLocalDeploy = deployHelper.isLocalNetwork(network);
   const owner = isLocalDeploy ? accounts[0] : deployedJson.Owner;
   const proxyAdminAddr = deployedJson.ProxyAdmin;

   const tokenSymbol = "DTKN";
   if (isLocalDeploy || !deployedJson[tokenSymbol]) {
      deployedJson[tokenSymbol] = {};
      deployedJson[tokenSymbol].Symbol = tokenSymbol;
      deployedJson[tokenSymbol].TokenName = "Decrypto token";
      deployedJson[tokenSymbol].Decimals = 18;
   }
   const tokenName = deployedJson[tokenSymbol].TokenName;

   await deployer.deploy(ERC20Decrypto);
   const erc20Decrypto = await ERC20Decrypto.deployed();
   deployedJson[tokenSymbol].Logic = erc20Decrypto.address.toLowerCase();

   if (isLocalDeploy || !deployedJson[tokenSymbol].Proxy) {
      const data = erc20Decrypto.contract.methods.initialize(tokenName, tokenSymbol, owner).encodeABI();
      await deployer.deploy(TransparentUpgradeableProxy, erc20Decrypto.address, proxyAdminAddr, data);
      const proxy = await TransparentUpgradeableProxy.deployed();
      deployedJson[tokenSymbol].Proxy = proxy.address.toLowerCase();
   } else {
     const proxy = await Proxy.at(deployedJson[tokenSymbol].Proxy);
     const proxyAdmin = await ProxyAdmin.at(proxyAdminAddr);
     proxyAdmin.upgrade(proxy.address, erc20Decrypto.address);
   }

   deployHelper.saveDeployed(deployedJson);

};
