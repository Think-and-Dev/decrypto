const ERC20Decrypto = artifacts.require("ERC20Decrypto");
const TransparentUpgradeableProxy = artifacts.require("TransparentUpgradeableProxy");
const deployHelper = require("../deployed/deployHelper");

module.exports = async function (deployer, network, accounts) {
   const deployedJson = deployHelper.getDeployed(network);
   const isLocalDeploy = deployHelper.isLocalNetwork(network);
   const owner = isLocalDeploy ? accounts[0] : deployedJson.Owner;
   const proxyAdminAddr = deployedJson.ProxyAdmin;

   const tokensToDeploy = [{ Symbol: "DTKN", TokenName: "Decrypto token" }, { Symbol: "STKN", TokenName: "S token" }];

   await deployer.deploy(ERC20Decrypto);
   const erc20Decrypto = await ERC20Decrypto.deployed();
   //initialize erc20 by owner
   await erc20Decrypto.initialize("", "", owner);

   for (let index = 0; index < tokensToDeploy.length; index++) {
      const tokenSymbol = tokensToDeploy[index].Symbol;
      const tokenName = tokensToDeploy[index].TokenName;

      if (isLocalDeploy || !deployedJson[tokenSymbol] || !deployedJson[tokenSymbol].Proxy) {
         deployedJson[tokenSymbol] = {};
         deployedJson[tokenSymbol].Symbol = tokenSymbol;
         deployedJson[tokenSymbol].TokenName = tokenName;
         deployedJson[tokenSymbol].Decimals = 18;

         const data = erc20Decrypto.contract.methods.initialize(tokenName, tokenSymbol, owner).encodeABI();
         await deployer.deploy(TransparentUpgradeableProxy, erc20Decrypto.address, proxyAdminAddr, data);
         const proxy = await TransparentUpgradeableProxy.deployed();
         deployedJson[tokenSymbol].Proxy = proxy.address.toLowerCase();
      } else {
         const proxy = await Proxy.at(deployedJson[tokenSymbol].Proxy);
         const proxyAdmin = await ProxyAdmin.at(proxyAdminAddr);
         proxyAdmin.upgrade(proxy.address, erc20Decrypto.address);
      }
      deployedJson[tokenSymbol].Logic = erc20Decrypto.address.toLowerCase();

      deployHelper.saveDeployed(deployedJson);
   }
};
