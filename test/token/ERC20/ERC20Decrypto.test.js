const { BN, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');
const ERC20BurnableMock = artifacts.require('ERC20Decrypto');

contract.only('ERC20Decrypto', function (accounts) {
    const [owner, anotherAccount, thirdAccount, ...otherAccounts] = accounts;

    const initialBalance = new BN(1000);

    const name = 'My Token';
    const symbol = 'MTKN';
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
            it('reverts when the address account is zero', async function () {
                await expectRevert(this.token.setAddressFee(
                    ZERO_ADDRESS, { from: owner }), 'ERC20: newAddressFee could not be 0',
                );
            });
            it('reverts when the sender has not admin role', async function () {
                await expectRevert(this.token.setAddressFee(
                    thirdAccount, { from: anotherAccount }), 'ERC20: must have admin role to setOwnerFee',
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
            it('reverts when the sender has not fee role', async function () {
                await expectRevert(this.token.setFee(
                    fee, { from: anotherAccount }), 'ERC20: must have fee role to setFees',
                );
            });
            it('reverts when fee is mayor than 1000', async function () {
                await expectRevert(this.token.setFee(
                    new BN(1000), { from: owner }), 'ERC20: newBasisPoints must not been mayor than 1000',
                );
            });
        });
        describe('transfer with fee', function () {

            it('transfer one account to other and the addressFee recive a fee', async function () {
                //set fee 2%
                const { logs } = await this.token.setFee(fee, { from: owner });
                expectEvent.inLogs(logs, 'FeesChange', {
                    oldFeeBasisPoints: zeroBN,
                    feeBasisPoints: fee
                });
                //set amount to transfer
                const amountBN = new BN(100);
                //set the transaction fee result
                const transactionFee = amountBN.mul(fee).div(new BN('10000'));
                //mint initial balance to account
                await this.token.mint(anotherAccount, initialBalance)
                //transfer 
                const transfer = await (this.token.transfer(thirdAccount, amountBN, { from: anotherAccount }));
                //evaluate events
                expectEvent.inLogs(transfer.logs, 'Transfer', {
                    from: anotherAccount,
                    to: owner,
                    value: transactionFee
                });

                expectEvent.inLogs(transfer.logs, 'Transfer', {
                    from: anotherAccount,
                    to: thirdAccount,
                    value: amountBN
                });
            });
        });
    });

});