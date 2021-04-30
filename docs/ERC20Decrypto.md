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

Account owner of feed
```js
address public addressFee;
```
---

Multiplier for Split
```js
uint256 public splitMultiplier;
```
---

Divider for Split
```js
uint256 public splitDivider;
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

## SplitChange

Emitted when apply split

**Parameters**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| oldSplitMultiplier | uint256 |  | 
| newSplitMultiplier | uint256 |  | 
| oldSplitDivider | uint256 |  | 
| newSplitDivider | uint256 |  | 

## Functions

- [initialize(string name, string symbol, address owner)](#initialize)
- [__ERC20Decrypto_init(string name, string symbol, address owner)](#__erc20decrypto_init)
- [__ERC20Decrypto_init_unchained(address owner)](#__erc20decrypto_init_unchained)
- [mint(address to, uint256 amount)](#mint)
- [pause()](#pause)
- [unpause()](#unpause)
- [setFee(uint256 newBasisPoints)](#setfee)
- [setAddressFee(address newAddressFee)](#setaddressfee)
- [split()](#split)
- [reverseSplit()](#reversesplit)
- [balanceOf(address account)](#balanceof)
- [allowance(address owner, address spender)](#allowance)
- [increaseAllowance(address spender, uint256 addedValue)](#increaseallowance)
- [decreaseAllowance(address spender, uint256 subtractedValue)](#decreaseallowance)
- [totalSupply()](#totalsupply)
- [transferFrom(address sender, address recipient, uint256 amount)](#transferfrom)
- [_unformattedValue(uint256 value)](#_unformattedvalue)
- [_formattedValue(uint256 value)](#_formattedvalue)
- [_setSplit(uint256 newSplitMultiplier, uint256 newSplitDivider)](#_setsplit)
- [_transfer(address sender, address recipient, uint256 amount)](#_transfer)
- [_beforeTokenTransfer(address from, address to, uint256 amount)](#_beforetokentransfer)
- [_approve(address owner, address spender, uint256 amount)](#_approve)
- [_burn(address account, uint256 amount)](#_burn)

### initialize

initialize contract -- proxy

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
function __ERC20Decrypto_init_unchained(address owner) internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
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
 - the caller must have the `ADMIN_ROLE`.

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
 - the caller must have the `ADMIN_ROLE`.

```js
function setAddressFee(address newAddressFee) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newAddressFee | address |  | 

### split

Set split
 Emits a {SplitChange} event.
 Requirements:
 - the caller must have the `ADMIN_ROLE`.

```js
function split() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### reverseSplit

Set halve split
 Emits a {SplitChange} event.
 Requirements:
 - the caller must have the `ADMIN_ROLE`.

```js
function reverseSplit() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### balanceOf

See {IERC20-balanceOf}.

```js
function balanceOf(address account) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

### allowance

See {IERC20-allowance}.

```js
function allowance(address owner, address spender) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| spender | address |  | 

### increaseAllowance

Atomically increases the allowance granted to `spender` by the caller.
 This is an alternative to {approve} that can be used as a mitigation for
 problems described in {IERC20-approve}.
 Emits an {Approval} event indicating the updated allowance.
 Requirements:
 - `spender` cannot be the zero address.

```js
function increaseAllowance(address spender, uint256 addedValue) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| spender | address |  | 
| addedValue | uint256 |  | 

### decreaseAllowance

Atomically decreases the allowance granted to `spender` by the caller.
 This is an alternative to {approve} that can be used as a mitigation for
 problems described in {IERC20-approve}.
 Emits an {Approval} event indicating the updated allowance.
 Requirements:
 - `spender` cannot be the zero address.
 - `spender` must have allowance for the caller of at least
 `subtractedValue`.

```js
function decreaseAllowance(address spender, uint256 subtractedValue) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| spender | address |  | 
| subtractedValue | uint256 |  | 

### totalSupply

See {IERC20-totalSupply}.

```js
function totalSupply() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### transferFrom

See {IERC20-transferFrom}.
 Emits an {Approval} event indicating the updated allowance. This is not
 required by the EIP. See the note at the beginning of {ERC20}.
 Requirements:
 - `sender` and `recipient` cannot be the zero address.
 - `sender` must have a balance of at least `amount`.
 - the caller must have allowance for ``sender``'s tokens of at least
 `amount`.

```js
function transferFrom(address sender, address recipient, uint256 amount) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| sender | address |  | 
| recipient | address |  | 
| amount | uint256 |  | 

### _unformattedValue

Get the underlying value of the split

```js
function _unformattedValue(uint256 value) internal view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| value | uint256 |  | 

### _formattedValue

Get the formatted value of the split

```js
function _formattedValue(uint256 value) internal view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| value | uint256 |  | 

### _setSplit

Set split divider and multiplier
 Emits a {SplitChange} event.
 Requirements:
 - `newSplitMultiplier` cannot be the zero.
 - `newSplitDivider` cannot be the zero.
 - the caller must have the `ADMIN_ROLE`.

```js
function _setSplit(uint256 newSplitMultiplier, uint256 newSplitDivider) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newSplitMultiplier | uint256 |  | 
| newSplitDivider | uint256 |  | 

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

### _approve

Sets `amount` as the allowance of `spender` over the `owner` s tokens.
 This internal function is equivalent to `approve`, and can be used to
 e.g. set automatic allowances for certain subsystems, etc.
 Emits an {Approval} event.
 Requirements:
 - `owner` cannot be the zero address.
 - `spender` cannot be the zero address.

```js
function _approve(address owner, address spender, uint256 amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| spender | address |  | 
| amount | uint256 |  | 

### _burn

Destroys `amount` tokens from `account`, reducing the
 total supply.
 Emits a {Transfer} event with `to` set to the zero address.
 Requirements:
 - `account` cannot be the zero address.
 - `account` must have at least `amount` tokens.

```js
function _burn(address account, uint256 amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 
| amount | uint256 |  | 

