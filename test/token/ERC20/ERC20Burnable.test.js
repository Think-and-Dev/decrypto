const { BN } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC20Burnable } = require('./behaviors/ERC20Burnable.behavior');
const ERC20BurnableMock = artifacts.require('ERC20Decrypto');

contract.only('ERC20Burnable', function (accounts) {
  const [ owner, ...otherAccounts ] = accounts;

  const initialBalance = new BN(1000);

  const name = 'My Token';
  const symbol = 'MTKN';

  beforeEach(async function () {
    this.token = await ERC20BurnableMock.new();
    // await  this.token.__ERC20BurnableMock_init(name, symbol, owner, initialBalance, { from: owner });
    await this.token.initialize(name, symbol, owner);
    await this.token.mint(owner,initialSupply)
  });

  shouldBehaveLikeERC20Burnable(owner, initialBalance, otherAccounts);
});
