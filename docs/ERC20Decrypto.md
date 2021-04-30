---
id: version-0.1.0-ERC20Decrypto
title: ERC20Decrypto
original_id: ERC20Decrypto
---

# ERC20Decrypto.sol

View Source: [contracts/ERC20Decrypto.sol](../contracts/ERC20Decrypto.sol)

**↗ Extends: [Initializable](Initializable.md), [ContextUpgradeable](ContextUpgradeable.md), [AccessControlUpgradeable](AccessControlUpgradeable.md), [ERC20BurnableUpgradeable](ERC20BurnableUpgradeable.md), [ERC20PausableUpgradeable](ERC20PausableUpgradeable.md)**

**ERC20Decrypto** - version: 0.1.0

## Contract Members
**Constants & Variables**

Base fee to apply to a transfer
```js
uint256 public basisPointsRate;
```
---

Minter rol
```js
bytes32 public constant MINTER_ROLE;
```
---

Pauser rol
```js
bytes32 public constant PAUSER_ROLE;
```
---

Pauser rol
```js
bytes32 public constant FEE_ROLE;
```
---

Account owner of feed
```js
address private _addressFee;
```
---

## FeesChange

Emitted when `newFeeds` are sets

**Parameters**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| oldFeeBasisPoints | uint256 |  | 
| feeBasisPoints | uint256 |  | 

## AddressFeeChange

Emitted when owner fee set

**Parameters**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| oldOwnerFee | address |  | 
| newOwnerFee | address |  | 

## Functions

- [initialize(string name, string symbol, address owner)](#initialize)
- [__ERC20Decrypto_init(string name, string symbol, address owner)](#__erc20decrypto_init)
- [__ERC20Decrypto_init_unchained(string name, string symbol, address owner)](#__erc20decrypto_init_unchained)
- [mint(address to, uint256 amount)](#mint)
- [pause()](#pause)
- [unpause()](#unpause)
- [setFee(uint256 newBasisPoints)](#setfee)
- [setAddressFee(address newAddressFee)](#setaddressfee)
- [_transfer(address sender, address recipient, uint256 amount)](#_transfer)
- [_beforeTokenTransfer(address from, address to, uint256 amount)](#_beforetokentransfer)

### initialize

```js
function initialize(string name, string symbol, address owner) public nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| name | string |  | 
| symbol | string |  | 
| owner | address |  | 

### __ERC20Decrypto_init

Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
 account that deploys the contract.

```js
function __ERC20Decrypto_init(string name, string symbol, address owner) internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| name | string |  | 
| symbol | string |  | 
| owner | address |  | 

### __ERC20Decrypto_init_unchained

Set admin, minter, fee and pauser rols by sender
 Emit RoleAdminChanged and RoleGranted (pauser and minter)

```js
function __ERC20Decrypto_init_unchained(string name, string symbol, address owner) internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| name | string |  | 
| symbol | string |  | 
| owner | address |  | 

### mint

Creates `amount` new tokens for `to`.
 Requirements:
 - the caller must have the `MINTER_ROLE`.

```js
function mint(address to, uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address |  | 
| amount | uint256 |  | 

### pause

Pauses all token transfers.
 Requirements:
 - the caller must have the `PAUSER_ROLE`.

```js
function pause() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### unpause

Unpauses all token transfers.
 Requirements:
 - the caller must have the `PAUSER_ROLE`.

```js
function unpause() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setFee

Set basic and max fee
 Emits a {FeesChange} event.
 Requirements:
 - `recipient` cannot be the zero address.
 - the caller newBasisPoints not been mayor than 1000 (10%).
 - the caller must have the `FEE_ROLE`.

```js
function setFee(uint256 newBasisPoints) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newBasisPoints | uint256 |  | 

### setAddressFee

Set owner fee
 Emits a {AddressFeeChange} event.
 Requirements:
 - `newAddressFee` cannot be the zero address.
 - the caller must have a balance of at least `amount`.
 - the caller must have the `ADMIN_ROLE`.

```js
function setAddressFee(address newAddressFee) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newAddressFee | address |  | 

### _transfer

Moves tokens `amount` from `sender` to `recipient`.
 This is internal function is equivalent to {transfer}, and can be used to
 e.g. implement automatic token fees, slashing mechanisms, etc.
 Emits a {Transfer} event.
 Requirements:
 - `sender` cannot be the zero address.
 - `recipient` cannot be the zero address.
 - `sender` must have a balance of at least `amount`.

```js
function _transfer(address sender, address recipient, uint256 amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| sender | address |  | 
| recipient | address |  | 
| amount | uint256 |  | 

### _beforeTokenTransfer

```js
function _beforeTokenTransfer(address from, address to, uint256 amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| amount | uint256 |  | 

