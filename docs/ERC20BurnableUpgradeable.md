---
id: version-0.1.0-ERC20BurnableUpgradeable
title: ERC20BurnableUpgradeable
original_id: ERC20BurnableUpgradeable
---

# ERC20BurnableUpgradeable.sol

View Source: [contracts/zeppelin/token/ERC20/ERC20BurnableUpgradeable.sol](../contracts/zeppelin/token/ERC20/ERC20BurnableUpgradeable.sol)

**↗ Extends: [Initializable](Initializable.md), [ContextUpgradeable](ContextUpgradeable.md), [ERC20Upgradeable](ERC20Upgradeable.md)**
**↘ Derived Contracts: [ERC20BurnableMockUpgradeable](ERC20BurnableMockUpgradeable.md), [ERC20Decrypto](ERC20Decrypto.md), [ERC20PresetFixedSupplyUpgradeable](ERC20PresetFixedSupplyUpgradeable.md), [ERC20PresetMinterPauserUpgradeable](ERC20PresetMinterPauserUpgradeable.md)**

**ERC20BurnableUpgradeable** - version: 0.1.0

Extension of {ERC20} that allows token holders to destroy both their own
 tokens and those that they have an allowance for, in a way that can be
 recognized off-chain (via event analysis).

## Contract Members
**Constants & Variables**

```js
uint256[50] private __gap;
```
---

## Functions

- [__ERC20Burnable_init()](#__erc20burnable_init)
- [__ERC20Burnable_init_unchained()](#__erc20burnable_init_unchained)
- [burn(uint256 amount)](#burn)
- [burnFrom(address account, uint256 amount)](#burnfrom)

### __ERC20Burnable_init

```js
function __ERC20Burnable_init() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### __ERC20Burnable_init_unchained

```js
function __ERC20Burnable_init_unchained() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### burn

Destroys `amount` tokens from the caller.
 See {ERC20-_burn}.

```js
function burn(uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| amount | uint256 |  | 

### burnFrom

Destroys `amount` tokens from `account`, deducting from the caller's
 allowance.
 See {ERC20-_burn} and {ERC20-allowance}.
 Requirements:
 - the caller must have allowance for ``accounts``'s tokens of at least
 `amount`.

```js
function burnFrom(address account, uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 
| amount | uint256 |  | 

