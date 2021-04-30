const { BN, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const ERC20BurnableMock = artifacts.require('ERC20Decrypto');
const {
    shouldBehaveLikeERC20,
} = require('./ERC20.behavior');
const {
    shouldBehaveLikeERC20Burnable,
} = require('./behaviors/ERC20Burnable.behavior');

contract('ERC20Decrypto', function (accounts) {
    const [owner, anotherAccount, thirdAccount, ...otherAccounts] = accounts;

    const initialBalance = new BN(1000);

    const name = 'DecryptoToken';
    const symbol = 'DTKN';
    const { ZERO_ADDRESS } = constants;
    const fee = new BN(200);//200 =>2%
    const zeroBN = new BN(0);

    beforeEach(async function () {
        this.token = await ERC20BurnableMock.new();
        await this.token.initialize(name, symbol, owner);
        await this.token.mint(owner, initialBalance)

    });

    describe('fee', function () {
        describe('set address fee', function () {
            it('emits an address fee change event', async function () {
                const { logs } = await this.token.setAddressFee(anotherAccount, { from: owner });
                expectEvent.inLogs(logs, 'AddressFeeChange', {
                    oldOwnerFee: owner,
                    newOwnerFee: anotherAccount
                });
            });
            it('change addressFee', async function () {
                await this.token.setAddressFee(anotherAccount, { from: owner });
                expect(await this.token.addressFee.call()).to.be.equal(anotherAccount);
            });
            it('reverts when the address account is zero', async function () {
                await expectRevert(this.token.setAddressFee(
                    ZERO_ADDRESS, { from: owner }), 'ERC20: newAddressFee could not be 0',
                );
            });
            it('reverts when the sender has not admin role', async function () {
                await expectRevert(this.token.setAddressFee(
                    thirdAccount, { from: anotherAccount }), 'ERC20: must have admin role to setAddressFee',
                );
            });

        });
        describe('set fee', function () {
            it('emits an fee change event', async function () {
                const { logs } = await this.token.setFee(fee, { from: owner });
                expectEvent.inLogs(logs, 'FeesChange', {
                    oldFeeBasisPoints: zeroBN,
                    feeBasisPoints: fee
                });
            });
            it('change fee', async function () {
                await this.token.setFee(fee, { from: owner });
                expect(await this.token.basisPointsRate.call()).to.be.bignumber.equal(fee);
            });
            it('reverts when the sender has not admin role', async function () {
                await expectRevert(this.token.setFee(
                    fee, { from: anotherAccount }), 'ERC20: must have admin role to setFees',
                );
            });
            it('reverts when fee is mayor than 1000 (10%)', async function () {
                await expectRevert(this.token.setFee(
                    new BN(1000), { from: owner }), 'ERC20: newBasisPoints must not been mayor than 1000',
                );
            });
        });
        describe('transfer with fee', async function () {
            //set amount to transfer
            const amountBN = new BN(100);
            //set the transaction fee result
            const transactionFee = amountBN.mul(fee).div(new BN('10000'));

            beforeEach(async function () {
                //set fee 2%
                const { logs } = await this.token.setFee(fee, { from: owner });
                expectEvent.inLogs(logs, 'FeesChange', {
                    oldFeeBasisPoints: zeroBN,
                    feeBasisPoints: fee
                });
                //mint initial balance to account
                await this.token.mint(anotherAccount, amountBN)
            });

            describe('transfer one account to other and the addressFee recive a fee', function () {
                it('transfer', async function () {
                    //transfer 
                    await (this.token.transfer(thirdAccount, amountBN, { from: anotherAccount }));
                    //set the amount - fee
                    const balanceToReceive = amountBN.sub(transactionFee);

                    expect(await this.token.balanceOf(anotherAccount)).to.be.bignumber.equal('0');
                    expect(await this.token.balanceOf(thirdAccount)).to.be.bignumber.equal(balanceToReceive);
                    expect(await this.token.balanceOf(owner)).to.be.bignumber.equal(initialBalance.add(transactionFee));

                });
                it('emit transfer events', async function () {
                    //transfer 
                    const { logs } = await (this.token.transfer(thirdAccount, amountBN, { from: anotherAccount }));
                    //evaluate events
                    expectEvent.inLogs(logs, 'Transfer', {
                        from: anotherAccount,
                        to: owner,
                        value: transactionFee
                    });

                    expectEvent.inLogs(logs, 'Transfer', {
                        from: anotherAccount,
                        to: thirdAccount,
                        value: amountBN
                    });
                });
            });
            describe('transfer one account to other by spender (transferFrom) and the addressFee recive a fee', function () {
                beforeEach(async function () {
                    //approve other account
                    await this.token.approve(otherAccounts[0], amountBN, { from: anotherAccount });
                });
                //set spender account
                const spender = otherAccounts[0];
                //set token owner
                const tokenOwner = anotherAccount;

                it('transfer', async function () {
                    //transfer 
                    await (this.token.transferFrom(tokenOwner, thirdAccount, amountBN, { from: spender }));
                    //set the amount - fee
                    const balanceToReceive = amountBN.sub(transactionFee);

                    expect(await this.token.balanceOf(tokenOwner)).to.be.bignumber.equal('0');
                    expect(await this.token.balanceOf(thirdAccount)).to.be.bignumber.equal(balanceToReceive);
                    expect(await this.token.balanceOf(owner)).to.be.bignumber.equal(initialBalance.add(transactionFee));
                });

                it('emits events', async function () {
                    //transfer 
                    const { logs } = await (this.token.transferFrom(tokenOwner, thirdAccount, amountBN, { from: spender }));
                    //evaluate events
                    expectEvent.inLogs(logs, 'Transfer', {
                        from: tokenOwner,
                        to: owner,
                        value: transactionFee
                    });

                    expectEvent.inLogs(logs, 'Transfer', {
                        from: tokenOwner,
                        to: thirdAccount,
                        value: amountBN
                    });
                });
            });
        });
    });
    describe('split', function () {
        const splitMultiplier = new BN(1);
        const splitDivider = new BN(1);
        const doubleBN = new BN(2);

        describe('make split', function () {
            beforeEach(async function () {
                await (this.token.split());
            });

            it('split', async function () {
                expect(await this.token.splitMultiplier.call()).to.be.bignumber.equal(splitMultiplier.mul(doubleBN));
                expect(await this.token.splitDivider.call()).to.be.bignumber.equal(splitDivider);
            });
            it('emit events', async function () {
                const { logs } = await (this.token.split());
                expectEvent.inLogs(logs, 'SplitChange', {
                    oldSplitMultiplier: splitMultiplier.mul(doubleBN),
                    newSplitMultiplier: splitMultiplier.mul(new BN(4)),
                    oldSplitDivider: splitDivider,
                    newSplitDivider: splitDivider
                });
            });
            //initial balance *2 because apply split
            shouldBehaveLikeERC20('ERC20', initialBalance.mul(doubleBN), owner, anotherAccount, thirdAccount);
            shouldBehaveLikeERC20Burnable(owner, initialBalance.mul(doubleBN), otherAccounts);


        });
    });

    describe('reverse split', function () {
        const splitMultiplier = new BN(1);
        const splitDivider = new BN(1);
        const doubleBN = new BN(2);

        describe('make reverse split', function () {
            beforeEach(async function () {
                await (this.token.reverseSplit());
            });

            it('reverse split', async function () {
                expect(await this.token.splitMultiplier.call()).to.be.bignumber.equal(splitMultiplier);
                expect(await this.token.splitDivider.call()).to.be.bignumber.equal(splitDivider.mul(doubleBN));
            });
            it('emit events', async function () {
                const { logs } = await (this.token.reverseSplit());
                expectEvent.inLogs(logs, 'SplitChange', {
                    oldSplitMultiplier: splitMultiplier,
                    newSplitMultiplier: splitMultiplier,
                    oldSplitDivider: splitDivider.mul(doubleBN),
                    newSplitDivider: splitDivider.mul(new BN(4)),
                });
            });
            //initial balance /2 because apply reverse split
            shouldBehaveLikeERC20('ERC20', initialBalance.div(doubleBN), owner, anotherAccount, thirdAccount);
            shouldBehaveLikeERC20Burnable(owner, initialBalance.div(doubleBN), otherAccounts);


        });
    });
    describe('apply split and reverse split', function () {
        const splitMultiplier = new BN(1);
        const splitDivider = new BN(1);
        const doubleBN = new BN(2);

        describe('make split & reverse split', function () {
            beforeEach(async function () {
                await (this.token.split());
                await (this.token.reverseSplit());
            });

            it('split & reverse split', async function () {
                expect(await this.token.splitMultiplier.call()).to.be.bignumber.equal(splitMultiplier.mul(doubleBN));
                expect(await this.token.splitDivider.call()).to.be.bignumber.equal(splitDivider.mul(doubleBN));
            });
            it('emit events', async function () {
                const { logs } = await (this.token.split());
                expectEvent.inLogs(logs, 'SplitChange', {
                    oldSplitMultiplier: splitMultiplier.mul(doubleBN),
                    newSplitMultiplier: splitMultiplier.mul(new BN(4)),
                    oldSplitDivider: splitDivider.mul(doubleBN),
                    newSplitDivider: splitDivider.mul(doubleBN)
                });
            });
            //initial balance because apply split & reverse split
            shouldBehaveLikeERC20('ERC20', initialBalance, owner, anotherAccount, thirdAccount);
            shouldBehaveLikeERC20Burnable(owner, initialBalance, otherAccounts);


        });
    });
    describe('apply split, reverse split and split', function () {
        const splitMultiplier = new BN(1);
        const splitDivider = new BN(1);
        const doubleBN = new BN(2);

        describe('make split, reverse split and split', function () {
            beforeEach(async function () {
                await (this.token.split());
                await (this.token.reverseSplit());
                const { logs } = await (this.token.split());
                expectEvent.inLogs(logs, 'SplitChange', {
                    oldSplitMultiplier: splitMultiplier.mul(doubleBN),
                    newSplitMultiplier: splitMultiplier.mul(new BN(4)),
                    oldSplitDivider: splitDivider.mul(doubleBN),
                    newSplitDivider: splitDivider.mul(doubleBN)
                });
            });

            it('everse split', async function () {
                expect(await this.token.splitMultiplier.call()).to.be.bignumber.equal(splitMultiplier.mul(new BN(4)));
                expect(await this.token.splitDivider.call()).to.be.bignumber.equal(splitDivider.mul(doubleBN));
            });
            //initial balance *2  because apply split & reverse split & split
            shouldBehaveLikeERC20('ERC20', initialBalance.mul(doubleBN), owner, anotherAccount, thirdAccount);
            shouldBehaveLikeERC20Burnable(owner, initialBalance.mul(doubleBN), otherAccounts);


        });
    });
    describe('apply split * 3 and reverse split *4', function () {
        const splitMultiplier = new BN(1);
        const splitDivider = new BN(1);
        const tripleBN = new BN(8);

        describe('make split, reverse split and split', function () {
            beforeEach(async function () {
                for (let index = 0; index < 3; index++) {
                    await (this.token.split());
                }
                for (let index = 0; index < 3; index++) {
                    await (this.token.reverseSplit());
                }
                const { logs } = await (this.token.reverseSplit());
                expectEvent.inLogs(logs, 'SplitChange', {
                    oldSplitMultiplier: splitMultiplier.mul(tripleBN),
                    newSplitMultiplier: splitMultiplier.mul(tripleBN),
                    oldSplitDivider: splitDivider.mul(tripleBN),
                    newSplitDivider: splitDivider.mul(new BN(16))
                });
            });

            it('everse split', async function () {
                expect(await this.token.splitMultiplier.call()).to.be.bignumber.equal(splitMultiplier.mul(tripleBN));
                expect(await this.token.splitDivider.call()).to.be.bignumber.equal(splitDivider.mul(new BN(16)));
            });
            // //initial balance /2  because apply split * 3 & reverse split * 4
            shouldBehaveLikeERC20('ERC20', initialBalance.div(new BN(2)), owner, anotherAccount, thirdAccount);
            shouldBehaveLikeERC20Burnable(owner, initialBalance.div(new BN(2)), otherAccounts);


        });
    });

});