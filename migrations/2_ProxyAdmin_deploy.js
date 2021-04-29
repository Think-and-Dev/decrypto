const ProxyAdmin = artifacts.require("ProxyAdmin");
const deployHelper = require("../deployed/deployHelper");

module.exports = async function(deployer, network, accounts) {
    const deployedJson = deployHelper.getDeployed(network);
    const isLocalDeploy = deployHelper.isLocalNetwork(network)
    const owner = isLocalDeploy ? accounts[0] : deployedJson.Owner;

    if (isLocalDeploy || !deployedJson.ProxyAdmin) {
        await deployer.deploy(ProxyAdmin);
        const proxyAdmin = await ProxyAdmin.deployed();
        deployedJson.ProxyAdmin = proxyAdmin.address.toLowerCase();
        deployHelper.saveDeployed(deployedJson);
        await proxyAdmin.transferOwnership(owner);
    }
};
