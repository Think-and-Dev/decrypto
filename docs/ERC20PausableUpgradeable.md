---
id: version-0.1.0-ERC20PausableUpgradeable
title: ERC20PausableUpgradeable
original_id: ERC20PausableUpgradeable
---

# ERC20PausableUpgradeable.sol

View Source: [contracts/zeppelin/token/ERC20/ERC20PausableUpgradeable.sol](../contracts/zeppelin/token/ERC20/ERC20PausableUpgradeable.sol)

**↗ Extends: [Initializable](Initializable.md), [ERC20Upgradeable](ERC20Upgradeable.md), [PausableUpgradeable](PausableUpgradeable.md)**
**↘ Derived Contracts: [ERC20Decrypto](ERC20Decrypto.md), [ERC20PausableMockUpgradeable](ERC20PausableMockUpgradeable.md), [ERC20PresetMinterPauserUpgradeable](ERC20PresetMinterPauserUpgradeable.md)**

**ERC20PausableUpgradeable** - version: 0.1.0

ERC20 token with pausable token transfers, minting and burning.
 Useful for scenarios such as preventing trades until the end of an evaluation
 period, or having an emergency switch for freezing all token transfers in the
 event of a large bug.

## Contract Members
**Constants & Variables**

```js
uint256[50] private __gap;
```
---

## Functions

- [__ERC20Pausable_init()](#__erc20pausable_init)
- [__ERC20Pausable_init_unchained()](#__erc20pausable_init_unchained)
- [_beforeTokenTransfer(address from, address to, uint256 amount)](#_beforetokentransfer)

### __ERC20Pausable_init

```js
function __ERC20Pausable_init() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### __ERC20Pausable_init_unchained

```js
function __ERC20Pausable_init_unchained() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _beforeTokenTransfer

See {ERC20-_beforeTokenTransfer}.
 Requirements:
 - the contract must not be paused.

```js
function _beforeTokenTransfer(address from, address to, uint256 amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| amount | uint256 |  | 

