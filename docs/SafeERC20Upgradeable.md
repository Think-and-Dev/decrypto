---
id: version-0.1.0-SafeERC20Upgradeable
title: SafeERC20Upgradeable
original_id: SafeERC20Upgradeable
---

# SafeERC20 (SafeERC20Upgradeable.sol)

View Source: [contracts/zeppelin/token/ERC20/SafeERC20Upgradeable.sol](../contracts/zeppelin/token/ERC20/SafeERC20Upgradeable.sol)

**SafeERC20Upgradeable** - version: 0.1.0

Wrappers around ERC20 operations that throw on failure (when the token
 contract returns false). Tokens that return no value (and instead revert or
 throw on failure) are also supported, non-reverting calls are assumed to be
 successful.
 To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 which allows you to call the safe operations as `token.safeTransfer(...)`, etc.

## Functions

- [safeTransfer(IERC20Upgradeable token, address to, uint256 value)](#safetransfer)
- [safeTransferFrom(IERC20Upgradeable token, address from, address to, uint256 value)](#safetransferfrom)
- [safeApprove(IERC20Upgradeable token, address spender, uint256 value)](#safeapprove)
- [safeIncreaseAllowance(IERC20Upgradeable token, address spender, uint256 value)](#safeincreaseallowance)
- [safeDecreaseAllowance(IERC20Upgradeable token, address spender, uint256 value)](#safedecreaseallowance)
- [_callOptionalReturn(IERC20Upgradeable token, bytes data)](#_calloptionalreturn)

### safeTransfer

```js
function safeTransfer(IERC20Upgradeable token, address to, uint256 value) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | IERC20Upgradeable |  | 
| to | address |  | 
| value | uint256 |  | 

### safeTransferFrom

```js
function safeTransferFrom(IERC20Upgradeable token, address from, address to, uint256 value) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | IERC20Upgradeable |  | 
| from | address |  | 
| to | address |  | 
| value | uint256 |  | 

### safeApprove

Deprecated. This function has issues similar to the ones found in
 {IERC20-approve}, and its usage is discouraged.
 Whenever possible, use {safeIncreaseAllowance} and
 {safeDecreaseAllowance} instead.

```js
function safeApprove(IERC20Upgradeable token, address spender, uint256 value) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | IERC20Upgradeable |  | 
| spender | address |  | 
| value | uint256 |  | 

### safeIncreaseAllowance

```js
function safeIncreaseAllowance(IERC20Upgradeable token, address spender, uint256 value) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | IERC20Upgradeable |  | 
| spender | address |  | 
| value | uint256 |  | 

### safeDecreaseAllowance

```js
function safeDecreaseAllowance(IERC20Upgradeable token, address spender, uint256 value) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | IERC20Upgradeable |  | 
| spender | address |  | 
| value | uint256 |  | 

### _callOptionalReturn

Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
 on the return value: the return value is optional (but if data is returned, it must not be false).

```js
function _callOptionalReturn(IERC20Upgradeable token, bytes data) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | IERC20Upgradeable | The token targeted by the call. | 
| data | bytes | The call data (encoded using abi.encode or one of its variants). | 

