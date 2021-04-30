---
id: version-0.1.0-Proxy
title: Proxy
original_id: Proxy
---

# Proxy.sol

View Source: [contracts/zeppelin/proxy/Proxy.sol](../contracts/zeppelin/proxy/Proxy.sol)

**↘ Derived Contracts: [UpgradeableProxy](UpgradeableProxy.md)**

**Proxy** - version: 0.1.0

This abstract contract provides a fallback function that delegates all calls to another contract using the EVM
 instruction `delegatecall`. We refer to the second contract as the _implementation_ behind the proxy, and it has to
 be specified by overriding the virtual {_implementation} function.
 Additionally, delegation to the implementation can be triggered manually through the {_fallback} function, or to a
 different contract through the {_delegate} function.
 The success and return data of the delegated call will be returned back to the caller of the proxy.

## Functions

- [_delegate(address implementation)](#_delegate)
- [_implementation()](#_implementation)
- [_fallback()](#_fallback)
- [()](#)
- [()](#)
- [_beforeFallback()](#_beforefallback)

### _delegate

Delegates the current call to `implementation`.
 This function does not return to its internall call site, it will return directly to the external caller.

```js
function _delegate(address implementation) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| implementation | address |  | 

### _implementation

This is a virtual function that should be overriden so it returns the address to which the fallback function
 and {_fallback} should delegate.

```js
function _implementation() internal view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _fallback

Delegates the current call to the address returned by `_implementation()`.
 This function does not return to its internall call site, it will return directly to the external caller.

```js
function _fallback() internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### 

Fallback function that delegates calls to the address returned by `_implementation()`. Will run if no other
 function in the contract matches the call data.

```js
function () external payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### 

Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data
 is empty.

```js
function () external payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _beforeFallback

Hook that is called before falling back to the implementation. Can happen as part of a manual `_fallback`
 call, or as part of the Solidity `fallback` or `receive` functions.
 If overriden should call `super._beforeFallback()`.

```js
function _beforeFallback() internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

