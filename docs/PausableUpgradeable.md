---
id: version-0.1.0-PausableUpgradeable
title: PausableUpgradeable
original_id: PausableUpgradeable
---

# PausableUpgradeable.sol

View Source: [contracts/zeppelin/utils/PausableUpgradeable.sol](../contracts/zeppelin/utils/PausableUpgradeable.sol)

**↗ Extends: [Initializable](Initializable.md), [ContextUpgradeable](ContextUpgradeable.md)**
**↘ Derived Contracts: [ERC20PausableUpgradeable](ERC20PausableUpgradeable.md)**

**PausableUpgradeable** - version: 0.1.0

Contract module which allows children to implement an emergency stop
 mechanism that can be triggered by an authorized account.
 This module is used through inheritance. It will make available the
 modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 the functions of your contract. Note that they will not be pausable by
 simply including this module, only once the modifiers are put in place.

## Contract Members
**Constants & Variables**

```js
bool private _paused;
```
---

```js
uint256[49] private __gap;
```
---

## Paused

Emitted when the pause is triggered by `account`.

**Parameters**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

## Unpaused

Emitted when the pause is lifted by `account`.

**Parameters**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

## Modifiers

- [whenNotPaused](#whennotpaused)
- [whenPaused](#whenpaused)

### whenNotPaused

Modifier to make a function callable only when the contract is not paused.
 Requirements:
 - The contract must not be paused.

```js
modifier whenNotPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenPaused

Modifier to make a function callable only when the contract is paused.
 Requirements:
 - The contract must be paused.

```js
modifier whenPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [__Pausable_init()](#__pausable_init)
- [__Pausable_init_unchained()](#__pausable_init_unchained)
- [paused()](#paused)
- [_pause()](#_pause)
- [_unpause()](#_unpause)

### __Pausable_init

Initializes the contract in unpaused state.

```js
function __Pausable_init() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### __Pausable_init_unchained

```js
function __Pausable_init_unchained() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### paused

Returns true if the contract is paused, and false otherwise.

```js
function paused() public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _pause

Triggers stopped state.
 Requirements:
 - The contract must not be paused.

```js
function _pause() internal nonpayable whenNotPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _unpause

Returns to normal state.
 Requirements:
 - The contract must be paused.

```js
function _unpause() internal nonpayable whenPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

