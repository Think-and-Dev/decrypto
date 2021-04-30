---
id: version-0.1.0-UpgradeableProxy
title: UpgradeableProxy
original_id: UpgradeableProxy
---

# UpgradeableProxy.sol

View Source: [contracts/zeppelin/proxy/UpgradeableProxy.sol](../contracts/zeppelin/proxy/UpgradeableProxy.sol)

**↗ Extends: [Proxy](Proxy.md)**
**↘ Derived Contracts: [TransparentUpgradeableProxy](TransparentUpgradeableProxy.md)**

**UpgradeableProxy** - version: 0.1.0

This contract implements an upgradeable proxy. It is upgradeable because calls are delegated to an
 implementation address that can be changed. This address is stored in storage in the location specified by
 https://eips.ethereum.org/EIPS/eip-1967[EIP1967], so that it doesn't conflict with the storage layout of the
 implementation behind the proxy.
 Upgradeability is only provided internally through {_upgradeTo}. For an externally upgradeable proxy see
 {TransparentUpgradeableProxy}.

## Contract Members
**Constants & Variables**

Storage slot with the address of the current implementation.
 This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is
 validated in the constructor.
```js
bytes32 private constant _IMPLEMENTATION_SLOT;
```
---

## Upgraded

Emitted when the implementation is upgraded.

**Parameters**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| implementation | address |  | 

## Functions

- [(address _logic, bytes _data)](#)
- [_implementation()](#_implementation)
- [_upgradeTo(address newImplementation)](#_upgradeto)
- [_setImplementation(address newImplementation)](#_setimplementation)

### 

Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
 If `_data` is nonempty, it's used as data in a delegate call to `_logic`. This will typically be an encoded
 function call, and allows initializating the storage of the proxy like a Solidity constructor.

```js
function (address _logic, bytes _data) public payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _logic | address |  | 
| _data | bytes |  | 

### _implementation

Returns the current implementation address.

```js
function _implementation() internal view
returns(impl address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _upgradeTo

Upgrades the proxy to a new implementation.
 Emits an {Upgraded} event.

```js
function _upgradeTo(address newImplementation) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newImplementation | address |  | 

### _setImplementation

Stores a new address in the EIP1967 implementation slot.

```js
function _setImplementation(address newImplementation) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newImplementation | address |  | 

