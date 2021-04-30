---
id: version-0.1.0-ERC20Upgradeable
title: ERC20Upgradeable
original_id: ERC20Upgradeable
---

# ERC20Upgradeable.sol

View Source: [contracts/zeppelin/token/ERC20/ERC20Upgradeable.sol](../contracts/zeppelin/token/ERC20/ERC20Upgradeable.sol)

**↗ Extends: [Initializable](Initializable.md), [ContextUpgradeable](ContextUpgradeable.md), [IERC20Upgradeable](IERC20Upgradeable.md)**
**↘ Derived Contracts: [ERC20BurnableUpgradeable](ERC20BurnableUpgradeable.md), [ERC20CappedUpgradeable](ERC20CappedUpgradeable.md), [ERC20DecimalsMockUpgradeable](ERC20DecimalsMockUpgradeable.md), [ERC20MockUpgradeable](ERC20MockUpgradeable.md), [ERC20PausableUpgradeable](ERC20PausableUpgradeable.md), [ERC20PermitUpgradeable](ERC20PermitUpgradeable.md), [ERC20SnapshotUpgradeable](ERC20SnapshotUpgradeable.md)**

**ERC20Upgradeable** - version: 0.1.0

Implementation of the {IERC20} interface.
 This implementation is agnostic to the way tokens are created. This means
 that a supply mechanism has to be added in a derived contract using {_mint}.
 For a generic mechanism see {ERC20PresetMinterPauser}.
 TIP: For a detailed writeup see our guide
 https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 to implement supply mechanisms].
 We have followed general OpenZeppelin guidelines: functions revert instead
 of returning `false` on failure. This behavior is nonetheless conventional
 and does not conflict with the expectations of ERC20 applications.
 Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 This allows applications to reconstruct the allowance for all accounts just
 by listening to said events. Other implementations of the EIP may not emit
 these events, as it isn't required by the specification.
 Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 functions have been added to mitigate the well-known issues around setting
 allowances. See {IERC20-approve}.

## Contract Members
**Constants & Variables**

```js
mapping(address => uint256) internal _balances;
```
---

```js
mapping(address => mapping(address => uint256)) internal _allowances;
```
---

```js
uint256 internal _totalSupply;
```
---

```js
string private _name;
```
---

```js
string private _symbol;
```
---

```js
uint8 private _decimals;
```
---

```js
uint256[44] private __gap;
```
---

## Functions

- [__ERC20_init(string name_, string symbol_)](#__erc20_init)
- [__ERC20_init_unchained(string name_, string symbol_)](#__erc20_init_unchained)
- [name()](#name)
- [symbol()](#symbol)
- [decimals()](#decimals)
- [totalSupply()](#totalsupply)
- [balanceOf(address account)](#balanceof)
- [transfer(address recipient, uint256 amount)](#transfer)
- [allowance(address owner, address spender)](#allowance)
- [approve(address spender, uint256 amount)](#approve)
- [transferFrom(address sender, address recipient, uint256 amount)](#transferfrom)
- [increaseAllowance(address spender, uint256 addedValue)](#increaseallowance)
- [decreaseAllowance(address spender, uint256 subtractedValue)](#decreaseallowance)
- [_transfer(address sender, address recipient, uint256 amount)](#_transfer)
- [_mint(address account, uint256 amount)](#_mint)
- [_burn(address account, uint256 amount)](#_burn)
- [_approve(address owner, address spender, uint256 amount)](#_approve)
- [_setupDecimals(uint8 decimals_)](#_setupdecimals)
- [_beforeTokenTransfer(address from, address to, uint256 amount)](#_beforetokentransfer)

### __ERC20_init

Sets the values for {name} and {symbol}, initializes {decimals} with
 a default value of 18.
 To select a different value for {decimals}, use {_setupDecimals}.
 All three of these values are immutable: they can only be set once during
 construction.

```js
function __ERC20_init(string name_, string symbol_) internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| name_ | string |  | 
| symbol_ | string |  | 

### __ERC20_init_unchained

```js
function __ERC20_init_unchained(string name_, string symbol_) internal nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| name_ | string |  | 
| symbol_ | string |  | 

### name

Returns the name of the token.

```js
function name() public view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### symbol

Returns the symbol of the token, usually a shorter version of the
 name.

```js
function symbol() public view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### decimals

Returns the number of decimals used to get its user representation.
 For example, if `decimals` equals `2`, a balance of `505` tokens should
 be displayed to a user as `5,05` (`505 / 10 ** 2`).
 Tokens usually opt for a value of 18, imitating the relationship between
 Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is
 called.
 NOTE: This information is only used for _display_ purposes: it in
 no way affects any of the arithmetic of the contract, including
 {IERC20-balanceOf} and {IERC20-transfer}.

```js
function decimals() public view
returns(uint8)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### totalSupply

See {IERC20-totalSupply}.

```js
function totalSupply() public view
returns(uint256)
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

### transfer

See {IERC20-transfer}.
 Requirements:
 - `recipient` cannot be the zero address.
 - the caller must have a balance of at least `amount`.

```js
function transfer(address recipient, uint256 amount) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| recipient | address |  | 
| amount | uint256 |  | 

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

### approve

See {IERC20-approve}.
 Requirements:
 - `spender` cannot be the zero address.

```js
function approve(address spender, uint256 amount) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| spender | address |  | 
| amount | uint256 |  | 

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

### _mint

Creates `amount` tokens and assigns them to `account`, increasing
 the total supply.
 Emits a {Transfer} event with `from` set to the zero address.
 Requirements:
 - `to` cannot be the zero address.

```js
function _mint(address account, uint256 amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 
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

### _setupDecimals

Sets {decimals} to a value other than the default one of 18.
 WARNING: This function should only be called from the constructor. Most
 applications that interact with token contracts will not expect
 {decimals} to ever change, and may work incorrectly if it does.

```js
function _setupDecimals(uint8 decimals_) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| decimals_ | uint8 |  | 

### _beforeTokenTransfer

Hook that is called before any transfer of tokens. This includes
 minting and burning.
 Calling conditions:
 - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
 will be to transferred to `to`.
 - when `from` is zero, `amount` tokens will be minted for `to`.
 - when `to` is zero, `amount` of ``from``'s tokens will be burned.
 - `from` and `to` are never both zero.
 To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].

```js
function _beforeTokenTransfer(address from, address to, uint256 amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| amount | uint256 |  | 

