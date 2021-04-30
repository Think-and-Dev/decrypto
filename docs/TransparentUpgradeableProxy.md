---
id: version-0.1.0-TransparentUpgradeableProxy
title: TransparentUpgradeableProxy
original_id: TransparentUpgradeableProxy
---

# TransparentUpgradeableProxy.sol

View Source: [contracts/zeppelin/proxy/TransparentUpgradeableProxy.sol](../contracts/zeppelin/proxy/TransparentUpgradeableProxy.sol)

**↗ Extends: [UpgradeableProxy](UpgradeableProxy.md)**

**TransparentUpgradeableProxy** - version: 0.1.0

This contract implements a proxy that is upgradeable by an admin.
 To avoid https://medium.com/nomic-labs-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357[proxy selector
 clashing], which can potentially be used in an attack, this contract uses the
 https://blog.openzeppelin.com/the-transparent-proxy-pattern/[transparent proxy pattern]. This pattern implies two
 things that go hand in hand:
 1. If any account other than the admin calls the proxy, the call will be forwarded to the implementation, even if
 that call matches one of the admin functions exposed by the proxy itself.
 2. If the admin calls the proxy, it can access the admin functions, but its calls will never be forwarded to the
 implementation. If the admin tries to call a function on the implementation it will fail with an error that says
 "admin cannot fallback to proxy target".
 These properties mean that the admin account can only be used for admin actions like upgrading the proxy or changing
 the admin, so it's best if it's a dedicated account that is not used for anything else. This will avoid headaches due
 to sudden errors when trying to call a function from the proxy implementation.
 Our recommendation is for the dedicated account to be an instance of the {ProxyAdmin} contract. If set up this way,
 you should think of the `ProxyAdmin` instance as the real administrative interface of your proxy.

## Contract Members
**Constants & Variables**

Storage slot with the admin of the contract.
 This is the keccak-256 hash of "eip1967.proxy.admin" subtracted by 1, and is
 validated in the constructor.
```js
bytes32 private constant _ADMIN_SLOT;
```
---

## AdminChanged

Emitted when the admin account has changed.

**Parameters**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| previousAdmin | address |  | 
| newAdmin | address |  | 

## Modifiers

- [ifAdmin](#ifadmin)

### ifAdmin

Modifier used internally that will delegate the call to the implementation unless the sender is the admin.

```js
modifier ifAdmin() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(address _logic, address admin_, bytes _data)](#)
- [admin()](#admin)
- [implementation()](#implementation)
- [changeAdmin(address newAdmin)](#changeadmin)
- [upgradeTo(address newImplementation)](#upgradeto)
- [upgradeToAndCall(address newImplementation, bytes data)](#upgradetoandcall)
- [_admin()](#_admin)
- [_setAdmin(address newAdmin)](#_setadmin)
- [_beforeFallback()](#_beforefallback)

### 

Initializes an upgradeable proxy managed by `_admin`, backed by the implementation at `_logic`, and
 optionally initialized with `_data` as explained in {UpgradeableProxy-constructor}.

```js
function (address _logic, address admin_, bytes _data) public payable UpgradeableProxy 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _logic | address |  | 
| admin_ | address |  | 
| _data | bytes |  | 

### admin

Returns the current admin.
 NOTE: Only the admin can call this function. See {ProxyAdmin-getProxyAdmin}.
 TIP: To get this value clients can read directly from the storage slot shown below (specified by EIP1967) using the
 https://eth.wiki/json-rpc/API#eth_getstorageat[`eth_getStorageAt`] RPC call.
 `0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103`

```js
function admin() external nonpayable ifAdmin 
returns(admin_ address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### implementation

Returns the current implementation.
 NOTE: Only the admin can call this function. See {ProxyAdmin-getProxyImplementation}.
 TIP: To get this value clients can read directly from the storage slot shown below (specified by EIP1967) using the
 https://eth.wiki/json-rpc/API#eth_getstorageat[`eth_getStorageAt`] RPC call.
 `0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc`

```js
function implementation() external nonpayable ifAdmin 
returns(implementation_ address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### changeAdmin

Changes the admin of the proxy.
 Emits an {AdminChanged} event.
 NOTE: Only the admin can call this function. See {ProxyAdmin-changeProxyAdmin}.

```js
function changeAdmin(address newAdmin) external nonpayable ifAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newAdmin | address |  | 

### upgradeTo

Upgrade the implementation of the proxy.
 NOTE: Only the admin can call this function. See {ProxyAdmin-upgrade}.

```js
function upgradeTo(address newImplementation) external nonpayable ifAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newImplementation | address |  | 

### upgradeToAndCall

Upgrade the implementation of the proxy, and then call a function from the new implementation as specified
 by `data`, which should be an encoded function call. This is useful to initialize new storage variables in the
 proxied contract.
 NOTE: Only the admin can call this function. See {ProxyAdmin-upgradeAndCall}.

```js
function upgradeToAndCall(address newImplementation, bytes data) external payable ifAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newImplementation | address |  | 
| data | bytes |  | 

### _admin

Returns the current admin.

```js
function _admin() internal view
returns(adm address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _setAdmin

Stores a new address in the EIP1967 admin slot.

```js
function _setAdmin(address newAdmin) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newAdmin | address |  | 

### _beforeFallback

Makes sure the admin cannot access the fallback function. See {Proxy-_beforeFallback}.

```js
function _beforeFallback() internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

