# Decrypto

Decrypto ERC20 representing stocks


## Pre requisites

- Install node.js 14 or higher https://nodejs.org/en/download/
- Install yarn `npm install yarn -g`
- Install dependencies `yarn install`


## Test
Use truffle to run the suit of unit test against a local blockchain (ganache-cli)
First open a new terminal set on this folder and run

    yarn ganache

It will run ganache-cli local blockchain with all necesary flags
After that run

    yarn start
It will build the contracts, run the linter, and run the unit tests using the ganache instance.

## Deploy

1. First create a `.secret` file that contains the 12 word seed (mnemonic key), this will be the account that will deploy the contracts, so be sure you have enough RBTC for the deployment. **IMPORTANT** this account will be the **OWNER** of the contracts, and will have **upgrade, minting and burning permissions**.

2. Then modify `./migrations/3_ERC20Decrypto_deploy.js` change
    ```js
        const tokensToDeploy = [{ Symbol: "DTKN", TokenName: "Decrypto token" }, { Symbol: "STKN", TokenName: "S token" }];

    ```
    For the token name and symbol you want add
    ```js
       [{ Symbol: "DTKN", TokenName: "Decrypto token" }];
    ```
    For the ERC20 name and symbol to deploy
3. Create a network deploy file
    You will nedd to create a json file, inside `deployed` folder, with the **owner** address of the contracts (this address belongs to mnemonic key of .sceret file). 
    
     The name of the file **must be the name of the network** (in this case tsktestnet.json)

     ```json
        {
            "owner": "0x8640273c0bb06fbaf5c16da62a61d96775ccb1de",
        }
    ```
    In this file, the deployment process will write the addresses

4. Run

        yarn migrate --network rsktestnet

    This will deploy the contracts to the selected network (in this case rsktestnet). Besides the information provided in the console, this process write a file with the netwrok name (in this case rsktetnet.json) inside `deployed` folder. This file will look like this:
    ```json
        {
            "owner": "0x8640273c0bb06fbaf5c16da62a61d96775ccb1de",
            "network": "rsktestnet",
            "ProxyAdmin": "0x133fd98051076ac45ea10d439d48e250f4d836ea",
            "DTKN": {
                "Symbol": "DTKN",
                "TokenName": "Decrypto token",
                "Decimals": 18,
                "Proxy": "0x0f63d4a28a6a1d67f99ee2e97b75b575a671a737",
                "Logic": "0x38ff643c6ee06258f806572bb80ae50c4d7b57a6"
            },
            "STKN": {
                "Symbol": "STKN",
                "TokenName": "S token",
                "Decimals": 18,
                "Proxy": "0x10ddbff8cdf356b9013e98e6c14a4b14f6df2532",
                "Logic": "0x38ff643c6ee06258f806572bb80ae50c4d7b57a6"
            } 
        }
    ```
    Where ProxyAdmin is the contract owner of the proxy following the [transparent proxy pattern](https://blog.openzeppelin.com/the-transparent-proxy-pattern/)
    ```json
        "ProxyAdmin": "0x2398273c0bb06fbaf5c16da62a61d96775ccb34e",
    ```
    The logic contract address is
    ```json
        "Logic": "0xfef844d19347a7848ce9b9475266c4b78d3b1baf",
    ```
    And the Proxy follow the [proxy pattern] (https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies) who permit upgrade the logic, so the access logic never change
    
    ```json
        "Proxy": "0x33b58b84004c8da543c1fa73d05c5eeb441de549"
    ```

If you change the ticker and run again the deploy, the file will look like this:
```json
    {
        "owner": "0x8640273c0bb06fbaf5c16da62a61d96775ccb1de",
        "network": "rsktestnet",
        "ProxyAdmin": "0x133fd98051076ac45ea10d439d48e250f4d836ea",
        "DTKN": {
            "Symbol": "DTKN",
            "TokenName": "Decrypto token",
            "Decimals": 18,
            "Proxy": "0x0f63d4a28a6a1d67f99ee2e97b75b575a671a737",
            "Logic": "0x38ff643c6ee06258f806572bb80ae50c4d7b57a6"
        },
        "STKN": {
            "Symbol": "STKN",
            "TokenName": "S token",
            "Decimals": 18,
            "Proxy": "0x10ddbff8cdf356b9013e98e6c14a4b14f6df2532",
            "Logic": "0x38ff643c6ee06258f806572bb80ae50c4d7b57a6"
        }, 
        "OTHER": {
            "Symbol": "OTHER",
            "TokenName": "Decrypto token",
            "Decimals": 18,
            "Proxy": "0x8507a3ef61d2abaec8f352a0a2d1cfa7009f4ca4",
            "Logic": "0x80edf5215693fcf620185a8e534c54a04a5cace4"
        }
    }
```
They will share the same Proxy Admin, but they will have their own proxy's and logic


## Upgrade

Once you have already deployed a Proxy Admin and a Proxy, and you want to point the proxy to a new logic follow this steps:

1. First  you need to have a `.secret` file that contains the **SAME** 12 word seed (mnemonic key) that you used to deploy the original contracts and the same owner address on the network json file.

2. Then modify `./migrations/3_ERC20Decrypto_deploy.js` change
    ```js
      const tokensToDeploy = [{ Symbol: "DTKN", TokenName: "Decrypto token" }, { Symbol: "STKN", TokenName: "S token" }];
    ```
    For the  **SAME** ticker of the token you deployed, and you want to upgrade

3. Run

        yarn migrate --network rsktestnet

    This will result in the Proxy pointing to the new Logic contract

    Following the example:

    ```json
        {
            "owner": "0x8640273c0bb06fbaf5c16da62a61d96775ccb1de",
            "network": "rsktestnet",
            "ProxyAdmin": "0x133fd98051076ac45ea10d439d48e250f4d836ea",
            "DTKN": {
                "Symbol": "DTKN",
                "TokenName": "Decrypto token",
                "Decimals": 18,
                "Proxy": "0x0f63d4a28a6a1d67f99ee2e97b75b575a671a737",
                "Logic": "0xe1c984c296cc75ec263510c7fe4b3d59b6d57560"
            },
            "STKN": {
                "Symbol": "STKN",
                "TokenName": "S token",
                "Decimals": 18,
                "Proxy": "0x10ddbff8cdf356b9013e98e6c14a4b14f6df2532",
                "Logic": "0xe1c984c296cc75ec263510c7fe4b3d59b6d57560"
            } 
        }
    ```



## Owner actions

Administrative actions that only the owner can call.
For this examples we will be using web3.
The address of the proxy and the abi [abis/ERC20Decrypto.json]('./abis/ERC20Decrypto.json') of the logic contract

```js
    const Web3 = require('web3')
    const jsonInterface = require('.abis/ERC20DEcrypto.json`')
    const web3 = new Web3('https://public-node.testnet.rsk.co')
    const proxyAddress = '0x33b58b84004c8da543c1fa73d05c5eeb441de549'
    const contract = new web3.eth.Contract(jsonInterface, proxyAddress)
```

For more information about the contracts methods see the ['./docs' folder]('./docs')

### mint
The owner can use the mint method to create an amount of tokens to an account.
```js
    const to = '0x9C95B0EF2D3E1D9ca479524Ba738C87BE28C1585' // address that will recieve the tokens
    const amount= '1000000000000000000' //amount in wei
    await contract.methods.mint(to, amount).send()
```
### mintBatch
The owner can use the mintBatch method to create amounts of tokens to accounts.
```js
    const accounts = ['0x9C95B0EF2D3E1D9ca479524Ba738C87BE28C1585',] // addresses that will recieve the tokens
    const amounts = ['1000000000000000000','1000000000000000000'] //amounts in wei
    await contract.methods.mintBatch(accounts, amounts).send()
```

### burn
The owner can use the burn method to remove an amount of tokens from his own account.
```js
    const amount = '1000000000000000000' //amount in wei
    await contract.methods.burn(amount).send()
```

### burnFromBatch
The owner can use the burnFromBatch method to remove amounts of tokens from the accounts, this deducting from the caller's allowance.
```js
    const amounts = '1000000000000000000' //amount in wei
    const accounts = ['0x9C95B0EF2D3E1D9ca479524Ba738C87BE28C1585',] // addresses that will brun the tokens
    await contract.methods.burnFromBatch(accounts, amounts).send()
```

### pause
The owner can pause the token, this will prevent any transfer/mint/burn from happening.
```js
    await contract.methods.pause().send()
```

### unpause
The owner can unpause the token, all actions will be back to normal.
```js
    await contract.methods.unpause().send()
```

### setFee
The owner can set a percentage that will be charged as a fee when transfering tokens.
This method will set the numerator of the fee, the denominator is always 10000.
The fefault fee is 0, fee can't be higher than 10% (1000)
```js
    const basisPointsRate = '100' //1% 100/10000
    await contract.methods.setFee(basisPointsRate).send()
```

### setAddressFee
The owner can set the address that will receive the fees. Default address is the owner
```js
    const address = '0x9C95B0EF2D3E1D9ca479524Ba738C87BE28C1585'
    await contract.methods.setAddressFee(address).send()
```

### split
The owner can perform a [split](https://www.investopedia.com/terms/s/stocksplit.asp#:~:text=A%20stock%20split%20is%20a,the%20liquidity%20of%20the%20shares.) doubling the tokens for all users. The owner can call this method multiple times, for example, if he called split two times, everyone will would end up with 4 times the tokens they had.
```js
    await contract.methods.split().send()
```

### reverseSplit
The owner can perform a [reverseSplit](https://www.investopedia.com/terms/r/reversesplit.asp), the tokens will be halved for all users. The owner can call this method multiple times, for example, if he called reverseSplit two times, everyone will would end up with 1/4 of the tokens they had.
```js
    await contract.methods.reverseSplit().send()
```

## Development

To run the linter use

    yarn lint


To run the code coverage use

    yarn coverage

This will create a `coverage` folder that contains an html report of the coverage


To create the flattened files to verify the contracts on the explorer run

    yarn flatten

This will create the flattened files for the contracts on the [./flatten](./flatten) folder


To generate the documentation for the contracts run

    yarn docgen

This will generate markdown documentation of the contract based on the solidoc comments on the code in the docs folder


To generate abis to interact with the contracts run

    yarn copy-abis

This will generate json files on the [./abis](./abis) folder


To check if the contracts are under 24kb as instructed in EIP-170 run

    yarn calc-size


