---
id: version-0.1.0-ContextUpgradeable
title: ContextUpgradeable
original_id: ContextUpgradeable
---

# ContextUpgradeable.sol

View Source: [contracts/zeppelin/utils/ContextUpgradeable.sol](../contracts/zeppelin/utils/ContextUpgradeable.sol)

**↗ Extends: [Initializable](Initializable.md)**
**↘ Derived Contracts: [AccessControlUpgradeable](AccessControlUpgradeable.md), [ERC20BurnableUpgradeable](ERC20BurnableUpgradeable.md), [ERC20Decrypto](ERC20Decrypto.md), [ERC20NoReturnMockUpgradeable](ERC20NoReturnMockUpgradeable.md), [ERC20PresetMinterPauserUpgradeable](ERC20PresetMinterPauserUpgradeable.md), [ERC20ReturnFalseMockUpgradeable](ERC20ReturnFalseMockUpgradeable.md), [ERC20ReturnTrueMockUpgradeable](ERC20ReturnTrueMockUpgradeable.md), [ERC20Upgradeable](ERC20Upgradeable.md), [OwnableUpgradeable](OwnableUpgradeable.md), [PausableUpgradeable](PausableUpgradeable.md), [SafeERC20WrapperUpgradeable](SafeERC20WrapperUpgradeable.md)**

**ContextUpgradeable** - version: 0.1.0

## Contract Members
**Constants & Variables**

```js
uint256[50] private __gap;
```
---

## Functions

- [__Context_init()](#__context_init)
- [__Context_init_unchained()](#__context_init_unchained)
- [_msgSender()](#_msgsender)
- [_msgData()](#_msgdata)

### __Context_init

```js
function __Context_init() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### __Context_init_unchained

```js
function __Context_init_unchained() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _msgSender

```js
function _msgSender() internal view
returns(address payable)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _msgData

```js
function _msgData() internal view
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

