---
id: version-0.1.0-ProxyAdmin
title: ProxyAdmin
original_id: ProxyAdmin
---

# ProxyAdmin.sol

View Source: [contracts/zeppelin/proxy/ProxyAdmin.sol](../contracts/zeppelin/proxy/ProxyAdmin.sol)

**↗ Extends: [Ownable](Ownable.md)**

**ProxyAdmin** - version: 0.1.0

This is an auxiliary contract meant to be assigned as the admin of a {TransparentUpgradeableProxy}. For an
 explanation of why you would want to use this see the documentation for {TransparentUpgradeableProxy}.

## Functions

- [getProxyImplementation(TransparentUpgradeableProxy proxy)](#getproxyimplementation)
- [getProxyAdmin(TransparentUpgradeableProxy proxy)](#getproxyadmin)
- [changeProxyAdmin(TransparentUpgradeableProxy proxy, address newAdmin)](#changeproxyadmin)
- [upgrade(TransparentUpgradeableProxy proxy, address implementation)](#upgrade)
- [upgradeAndCall(TransparentUpgradeableProxy proxy, address implementation, bytes data)](#upgradeandcall)

### getProxyImplementation

Returns the current implementation of `proxy`.
 Requirements:
 - This contract must be the admin of `proxy`.

```js
function getProxyImplementation(TransparentUpgradeableProxy proxy) public view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| proxy | TransparentUpgradeableProxy |  | 

### getProxyAdmin

Returns the current admin of `proxy`.
 Requirements:
 - This contract must be the admin of `proxy`.

```js
function getProxyAdmin(TransparentUpgradeableProxy proxy) public view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| proxy | TransparentUpgradeableProxy |  | 

### changeProxyAdmin

Changes the admin of `proxy` to `newAdmin`.
 Requirements:
 - This contract must be the current admin of `proxy`.

```js
function changeProxyAdmin(TransparentUpgradeableProxy proxy, address newAdmin) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| proxy | TransparentUpgradeableProxy |  | 
| newAdmin | address |  | 

### upgrade

Upgrades `proxy` to `implementation`. See {TransparentUpgradeableProxy-upgradeTo}.
 Requirements:
 - This contract must be the admin of `proxy`.

```js
function upgrade(TransparentUpgradeableProxy proxy, address implementation) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| proxy | TransparentUpgradeableProxy |  | 
| implementation | address |  | 

### upgradeAndCall

Upgrades `proxy` to `implementation` and calls a function on the new implementation. See
 {TransparentUpgradeableProxy-upgradeToAndCall}.
 Requirements:
 - This contract must be the admin of `proxy`.

```js
function upgradeAndCall(TransparentUpgradeableProxy proxy, address implementation, bytes data) public payable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| proxy | TransparentUpgradeableProxy |  | 
| implementation | address |  | 
| data | bytes |  | 

