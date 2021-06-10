const ProxyAdmin = artifacts.require("ProxyAdmin");
const deployHelper = require("../deployed/deployHelper");

module.exports = async function (deployer, network, accounts) {
    const deployedJson = deployHelper.getDeployed(network);
    const isLocalDeploy = deployHelper.isLocalNetwork(network)
    if (!isLocalDeploy && !deployedJson.owner) {
        throw new Error("Es necesario definir un owner en el json del deploy");
    }
    const owner = isLocalDeploy ? accounts[0] : deployedJson.owner;

    if (isLocalDeploy || !deployedJson.ProxyAdmin) {
        await deployer.deploy(ProxyAdmin);
        const proxyAdmin = await ProxyAdmin.deployed();
        deployedJson.ProxyAdmin = proxyAdmin.address.toLowerCase();
        deployHelper.saveDeployed(deployedJson);
        await proxyAdmin.transferOwnership(owner);
    }
};
