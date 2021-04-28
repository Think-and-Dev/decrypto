const { BN } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC20Burnable } = require('./behaviors/ERC20Burnable.behavior');
const ERC20BurnableMock = artifacts.require('ERC20Decrypto');

contract('ERC20Burnable', function (accounts) {
  const [ owner, ...otherAccounts ] = accounts;

  const initialBalance = new BN(1000);

  const name = 'DecryptoToken';
  const symbol = 'DTKN';

  beforeEach(async function () {
    this.token = await ERC20BurnableMock.new();
    // await  this.token.__ERC20BurnableMock_init(name, symbol, owner, initialBalance, { from: owner });
    await this.token.initialize(name, symbol, owner);
    await this.token.mint(owner,initialBalance)
  });

  shouldBehaveLikeERC20Burnable(owner, initialBalance, otherAccounts);
});
