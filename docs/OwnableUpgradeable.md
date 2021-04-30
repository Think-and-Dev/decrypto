---
id: version-0.1.0-OwnableUpgradeable
title: OwnableUpgradeable
original_id: OwnableUpgradeable
---

# OwnableUpgradeable.sol

View Source: [contracts/zeppelin/access/OwnableUpgradeable.sol](../contracts/zeppelin/access/OwnableUpgradeable.sol)

**↗ Extends: [Initializable](Initializable.md), [ContextUpgradeable](ContextUpgradeable.md)**

**OwnableUpgradeable** - version: 0.1.0

Contract module which provides a basic access control mechanism, where
 there is an account (an owner) that can be granted exclusive access to
 specific functions.
 By default, the owner account will be the one that deploys the contract. This
 can later be changed with {transferOwnership}.
 This module is used through inheritance. It will make available the modifier
 `onlyOwner`, which can be applied to your functions to restrict their use to
 the owner.

## Contract Members
**Constants & Variables**

```js
address private _owner;
```
---

```js
uint256[49] private __gap;
```
---

## OwnershipTransferred

**Parameters**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| previousOwner | address |  | 
| newOwner | address |  | 

## Modifiers

- [onlyOwner](#onlyowner)

### onlyOwner

Throws if called by any account other than the owner.

```js
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [__Ownable_init()](#__ownable_init)
- [__Ownable_init_unchained()](#__ownable_init_unchained)
- [owner()](#owner)
- [renounceOwnership()](#renounceownership)
- [transferOwnership(address newOwner)](#transferownership)

### __Ownable_init

Initializes the contract setting the deployer as the initial owner.

```js
function __Ownable_init() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### __Ownable_init_unchained

```js
function __Ownable_init_unchained() internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### owner

Returns the address of the current owner.

```js
function owner() public view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### renounceOwnership

Leaves the contract without owner. It will not be possible to call
 `onlyOwner` functions anymore. Can only be called by the current owner.
 NOTE: Renouncing ownership will leave the contract without an owner,
 thereby removing any functionality that is only available to the owner.

```js
function renounceOwnership() public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### transferOwnership

Transfers ownership of the contract to a new account (`newOwner`).
 Can only be called by the current owner.

```js
function transferOwnership(address newOwner) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newOwner | address |  | 

