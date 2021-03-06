/* eslint-disable no-console */
const fs = require('fs');

const contractNames = [
  'ERC20Decrypto',
  'ProxyAdmin'
];

const abisPath = './abis';
if (!fs.existsSync(abisPath)) {
  fs.mkdirSync(abisPath);
}

console.log(`Copying contract ABIs to: ${abisPath}`);

let contractBuild;

contractNames.forEach(contractName => {
  // eslint-disable-next-line import/no-dynamic-require
  contractBuild = require(`./build/contracts/${contractName}`);
  fs.writeFileSync(`${abisPath}/${contractName}.json`, JSON.stringify(contractBuild.abi, null, 2));
});

console.log('Finished');
