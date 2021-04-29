const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const {
  shouldBehaveLikeERC20,
} = require('./ERC20.behavior');

const ERC20Mock = artifacts.require('ERC20Decrypto');
const ProxyAdmin = artifacts.require('ProxyAdmin');
const Proxy = artifacts.require('TransparentUpgradeableProxy');

contract('Upgrade', function (accounts) {
  const [initialHolder, recipient, anotherAccount] = accounts;

  const name = 'DecryptoToken';
  const symbol = 'DTKN';

  const initialSupply = new BN(100);

  beforeEach(async function () {
    this.proxyAdmin = await ProxyAdmin.new();
    const token = await ERC20Mock.new();
    const data = token.contract.methods.initialize(name, symbol, initialHolder).encodeABI();
    this.proxy = await Proxy.new(token.address, this.proxyAdmin.address, data);
    //Use the proxy as the token
    this.token = await ERC20Mock.at(this.proxy.address);
    await this.token.mint(initialHolder, initialSupply);

    expect(await this.proxyAdmin.getProxyImplementation(this.proxy.address)).to.equal(token.address);
    expect(await this.token.name()).to.equal(name);
    expect(await this.token.symbol()).to.equal(symbol);
    expect(await this.token.decimals()).to.be.bignumber.equal('18');

    // Upgrade the contract
    const newToken = await ERC20Mock.new();
    await this.proxyAdmin.upgrade(this.proxy.address, newToken.address);

    expect(await this.proxyAdmin.getProxyImplementation(this.proxy.address)).to.equal(newToken.address);
  });

  it('has a name', async function () {
    expect(await this.token.name()).to.equal(name);
  });

  it('has a symbol', async function () {
    expect(await this.token.symbol()).to.equal(symbol);
  });

  it('has 18 decimals', async function () {
    expect(await this.token.decimals()).to.be.bignumber.equal('18');
  });

  shouldBehaveLikeERC20('ERC20', initialSupply, initialHolder, recipient, anotherAccount);

});