const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;
const { deepEqual } = require('deep-equal-extended');


const {
  shouldBehaveLikeERC20,
  shouldBehaveLikeERC20Transfer,
  shouldBehaveLikeERC20Approve,
} = require('./ERC20.behavior');

const ERC20Mock = artifacts.require('ERC20Decrypto');

contract('ERC20', function (accounts) {
  const [initialHolder, recipient, anotherAccount, fourAccount, fiveAccount] = accounts;

  const name = 'DecryptoToken';
  const symbol = 'DTKN';

  const initialSupply = new BN(100);

  const totalMintAmounts = new BN(57195);
  const mintAmounts = [new BN(5000), new BN(10000), new BN(42195)];
  const burnAmounts = [new BN(5000), new BN(9001), new BN(195)];

  const accountsCollection = [recipient, anotherAccount, fourAccount];
  const accountsCollectionsFail = [ZERO_ADDRESS, recipient, fourAccount];

  const fee = new BN(200);//200 =>2%

  function transferBatchEventSuccessful(logs, from, accounts, values) {
    expectEvent.inLogs(logs, 'TransferBatch', {
      from: from,
      to: accounts,
      // values: mintAmounts,
    });
    expect(deepEqual(logs.filter(e => e.event === 'TransferBatch')[0].args.values, values) == true);
  }

  function batchTransferWasSuccessful({ operator, from, accounts, values }) {
    it('debits transferred balances from sender', async function () {
      expect(await this.token.balanceOf(operator)).to.be.bignumber.equal('0');
    });

    it('credits transferred balances to receiver', async function () {
      for (let i = 0; i < accounts.length; i++) {
        expect(await this.token.balanceOf(accounts[i])).to.be.bignumber.equal(values[i]);
      }
    });
    it('emits a TransferBatch log', function () {
      transferBatchEventSuccessful(this.transferLogs, from, accounts, values)
    });
  }

  beforeEach(async function () {
    this.token = await ERC20Mock.new();
    await this.token.initialize(name, symbol, initialHolder);
  });


  describe('_mintBatch', function () {
    it('reverts when mint whit out admin role', async function () {
      await expectRevert(
        this.token.mintBatch(accountsCollectionsFail, mintAmounts, { from: recipient }),
        'ERC20: must have minter role to mint',
      );
    });
    it('reverts with a zero destination address', async function () {
      await expectRevert(
        this.token.mintBatch(accountsCollectionsFail, mintAmounts),
        'ERC20: mint to the zero address',
      );
    });

    it('reverts if length of inputs do not match', async function () {
      await expectRevert(
        this.token.mintBatch(accountsCollection, mintAmounts.slice(1)),
        'ERC20: accounts and amounts length mismatch',
      );

      await expectRevert(
        this.token.mintBatch(accountsCollection.slice(1), mintAmounts),
        'ERC20: accounts and amounts length mismatch',
      );
    });

    context('with minted batch of accounts', function () {
      beforeEach(async function () {
        ({ logs: this.logs } = await this.token.mintBatch(
          accountsCollection,
          mintAmounts,
          { from: initialHolder },
        ));
      });

      it('emits a TransferBatch event', function () {
        transferBatchEventSuccessful(this.logs, ZERO_ADDRESS, accountsCollection, mintAmounts)
      });

      it('credits the minted batch of tokens', async function () {
        for (let i = 0; i < accountsCollection.length; i++) {
          expect(await this.token.balanceOf(accountsCollection[i])).to.be.bignumber.equal(mintAmounts[i]);
        }
      });
    });
  });


  describe('_burnBatch', function () {
    beforeEach(async function () {
      for (let index = 0; index < accountsCollection.length; index++) {
        await this.token.approve(initialHolder, burnAmounts[index], { from: accountsCollection[index] });
      }
    });
    it('reverts when burning whit out admin role', async function () {
      await expectRevert(
        this.token.burnFromBatch(accountsCollectionsFail, burnAmounts, { from: recipient }),
        'ERC20: must have admin role to burn',
      );
    });
    it('reverts if length of inputs do not match', async function () {
      await expectRevert(
        this.token.burnFromBatch(accountsCollection, burnAmounts.slice(1)),
        'ERC20: accounts and amounts length mismatch',
      );

      await expectRevert(
        this.token.burnFromBatch(accountsCollection.slice(1), burnAmounts),
        'ERC20: accounts and amounts length mismatch',
      );
    });

    it('reverts when burning amount exceeds balance', async function () {
      await expectRevert(
        this.token.burnFromBatch(accountsCollection, burnAmounts),
        'ERC20: burn amount exceeds balance',
      );
    });

    context('with minted-then-burnt tokens', function () {
      beforeEach(async function () {
        await this.token.mintBatch(accountsCollection, mintAmounts);
        ({ logs: this.logs } = await this.token.burnFromBatch(
          accountsCollection, burnAmounts,
          { from: initialHolder },
        ));
      });

      it('emits a TransferBatch event', function () {
        transferBatchEventSuccessful(this.logs, initialHolder, [], burnAmounts)
      });

      it('accounts for both minting and burning', async function () {
        for (let i = 0; i < accountsCollection.length; i++) {
          expect(await this.token.balanceOf(accountsCollection[i])).to.be.bignumber.equal(mintAmounts[i].sub(burnAmounts[i]));
        }
      });

      it('emits a approve events', function () {
        for (let index = 0; index < accountsCollection.length; index++) {
          expectEvent.inLogs(this.logs, 'Approval', {
            owner: accountsCollection[index],
            spender: initialHolder,
            value: new BN(0)
          });

        }

      });

    });
  });


  describe('BatchTransferFrom', function () {
    beforeEach(async function () {
      await this.token.mint(initialHolder, totalMintAmounts)
    });
    it('reverts when transfer the zero account\'s', async function () {
      await expectRevert(
        this.token.transferFromBatch(initialHolder, accountsCollectionsFail, burnAmounts),
        'ERC20: transfer to the zero address',
      );
    });

    it('reverts if length of inputs do not match', async function () {
      await expectRevert(
        this.token.transferFromBatch(initialHolder, accountsCollectionsFail.slice(1), burnAmounts),
        'ERC20: accounts and amounts length mismatch',
      );

      await expectRevert(
        this.token.transferFromBatch(initialHolder, accountsCollectionsFail, burnAmounts.slice(1)),
        'ERC20: accounts and amounts length mismatch',
      );
    });

    it('reverts when transferring amount more than any of balances', async function () {
      const mintAmountsPlus = mintAmounts.map(function (val) { return val.add(new BN(1)); });
      await expectRevert(
        this.token.transferFromBatch(
          initialHolder, accountsCollection, mintAmountsPlus,
          { from: initialHolder },
        ),
        'ERC20: transfer amount exceeds balance',
      );
    });

    it('reverts when transferring amount exceeds allowance', async function () {
      await expectRevert(
        this.token.transferFromBatch(
          initialHolder, accountsCollection, mintAmounts,
          { from: initialHolder },
        ),
        'ERC20: transfer amount exceeds allowance -- Reason given: ERC20: transfer amount exceeds allowance.',
      );
    });

    context('when called was Successful', async function () {
      beforeEach(async function () {
        await this.token.approve(fiveAccount, totalMintAmounts, { from: initialHolder });
        ({ logs: this.transferLogs } =
          await this.token.transferFromBatch(
            initialHolder, accountsCollection, mintAmounts,
            { from: fiveAccount },
          ));
      });

      batchTransferWasSuccessful.call(this, {
        operator: initialHolder,
        from: initialHolder,
        accounts: accountsCollection,
        values: mintAmounts,
      });
    });
  });

  describe('BatchTransfer', function () {
    beforeEach(async function () {
      await this.token.mint(initialHolder, totalMintAmounts);
    });
    it('reverts when transfer the zero account\'s', async function () {
      await expectRevert(
        this.token.transferBatch(accountsCollectionsFail, burnAmounts),
        'ERC20: transfer to the zero address',
      );
    });

    it('reverts if length of inputs do not match', async function () {
      await expectRevert(
        this.token.transferBatch(accountsCollectionsFail.slice(1), burnAmounts),
        'ERC20: accounts and amounts length mismatch',
      );

      await expectRevert(
        this.token.transferBatch(accountsCollectionsFail, burnAmounts.slice(1)),
        'ERC20: accounts and amounts length mismatch',
      );
    });

    it('reverts when transferring amount more than any of balances', async function () {
      const mintAmountsPlus = mintAmounts.map(function (val) { return val.add(new BN(1)); });
      await expectRevert(
        this.token.transferBatch(
          accountsCollection, mintAmountsPlus,
          { from: initialHolder },
        ),
        'ERC20: transfer amount exceeds balance',
      );
    });

    context('when called was Successful', async function () {
      beforeEach(async function () {
        ({ logs: this.transferLogs } =
          await this.token.transferBatch(
            accountsCollection, mintAmounts,
            { from: initialHolder },
          ));
      });

      batchTransferWasSuccessful.call(this, {
        operator: initialHolder,
        from: initialHolder,
        accounts: accountsCollection,
        values: mintAmounts,
      });
    });
  });

  describe('transfer with fee', async function () {
    beforeEach(async function () {
      //set fee 2%
      const { logs } = await this.token.setFee(fee, { from: initialHolder });
      expectEvent.inLogs(logs, 'FeesChange', {
        oldFeeBasisPoints: new BN(0),
        feeBasisPoints: fee
      });
      //mint initial balance to account
      await this.token.mint(fiveAccount, totalMintAmounts)
    });

    describe('transfer batch and the addressFee recive a fee', function () {
      it('transferBatch', async function () {
        let transactionFee;
        let totalTransactionFee = new BN(0);
        //transfer 
        const { logs } = await this.token.transferBatch(accountsCollection, mintAmounts, { from: fiveAccount });
        transferBatchEventSuccessful(logs, fiveAccount, accountsCollection, mintAmounts);

        for (let i = 0; i < accountsCollection.length; i++) {
          transactionFee = mintAmounts[i].mul(fee).div(new BN('10000'));
          totalTransactionFee = totalTransactionFee.add(transactionFee);
          expect(await this.token.balanceOf(accountsCollection[i])).to.be.bignumber.equal(mintAmounts[i].sub(transactionFee));
        }
        expect(await this.token.balanceOf(fiveAccount)).to.be.bignumber.equal('0');
        expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(totalTransactionFee);
      });

      it('emit transfer fee events', async function () {
        const { logs } = await this.token.transferBatch(accountsCollection, mintAmounts, { from: fiveAccount });
        transferBatchEventSuccessful(logs, fiveAccount, accountsCollection, mintAmounts);

        for (let i = 0; i < accountsCollection.length; i++) {
          transactionFee = mintAmounts[i].mul(fee).div(new BN('10000'));
          expectEvent.inLogs(logs, 'Transfer', {
            from: fiveAccount,
            to: initialHolder,
            value: transactionFee
          });

        }
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

        it('validate split', async function () {
          expect(await this.token.splitMultiplier.call()).to.be.bignumber.equal(splitMultiplier.mul(new BN(4)));
          expect(await this.token.splitDivider.call()).to.be.bignumber.equal(splitDivider.mul(doubleBN));
        });
        it('transfer batch successful', async function () {
          const { logs } = await this.token.transferBatch(accountsCollection, mintAmounts, { from: fiveAccount });
          transferBatchEventSuccessful(logs, fiveAccount, accountsCollection, mintAmounts);
        });
      });
    });

  });
});
