---
id: version-0.1.0-Initializable
title: Initializable
original_id: Initializable
---

# Initializable.sol

View Source: [contracts/zeppelin/proxy/Initializable.sol](../contracts/zeppelin/proxy/Initializable.sol)

**↘ Derived Contracts: [AccessControlUpgradeable](AccessControlUpgradeable.md), [ContextUpgradeable](ContextUpgradeable.md), [EIP712Upgradeable](EIP712Upgradeable.md), [ERC20BurnableMockUpgradeable](ERC20BurnableMockUpgradeable.md), [ERC20BurnableUpgradeable](ERC20BurnableUpgradeable.md), [ERC20CappedMockUpgradeable](ERC20CappedMockUpgradeable.md), [ERC20CappedUpgradeable](ERC20CappedUpgradeable.md), [ERC20DecimalsMockUpgradeable](ERC20DecimalsMockUpgradeable.md), [ERC20Decrypto](ERC20Decrypto.md), [ERC20MockUpgradeable](ERC20MockUpgradeable.md), [ERC20NoReturnMockUpgradeable](ERC20NoReturnMockUpgradeable.md), [ERC20PausableMockUpgradeable](ERC20PausableMockUpgradeable.md), [ERC20PausableUpgradeable](ERC20PausableUpgradeable.md), [ERC20PermitMockUpgradeable](ERC20PermitMockUpgradeable.md), [ERC20PermitUpgradeable](ERC20PermitUpgradeable.md), [ERC20PresetFixedSupplyUpgradeable](ERC20PresetFixedSupplyUpgradeable.md), [ERC20PresetMinterPauserUpgradeable](ERC20PresetMinterPauserUpgradeable.md), [ERC20ReturnFalseMockUpgradeable](ERC20ReturnFalseMockUpgradeable.md), [ERC20ReturnTrueMockUpgradeable](ERC20ReturnTrueMockUpgradeable.md), [ERC20SnapshotMockUpgradeable](ERC20SnapshotMockUpgradeable.md), [ERC20SnapshotUpgradeable](ERC20SnapshotUpgradeable.md), [ERC20Upgradeable](ERC20Upgradeable.md), [OwnableUpgradeable](OwnableUpgradeable.md), [PausableUpgradeable](PausableUpgradeable.md), [ReentrancyGuardUpgradeable](ReentrancyGuardUpgradeable.md), [SafeERC20WrapperUpgradeable](SafeERC20WrapperUpgradeable.md), [TimelockControllerUpgradeable](TimelockControllerUpgradeable.md), [TokenTimelockUpgradeable](TokenTimelockUpgradeable.md)**

**Initializable** - version: 0.1.0

This is a base contract to aid in writing upgradeable contracts, or any kind of contract that will be deployed
 behind a proxy. Since a proxied contract can't have a constructor, it's common to move constructor logic to an
 external initializer function, usually called `initialize`. It then becomes necessary to protect this initializer
 function so it can only be called once. The {initializer} modifier provided by this contract will have this effect.
 TIP: To avoid leaving the proxy in an uninitialized state, the initializer function should be called as early as
 possible by providing the encoded function call as the `_data` argument to {UpgradeableProxy-constructor}.
 CAUTION: When used with inheritance, manual care must be taken to not invoke a parent initializer twice, or to ensure
 that all initializers are idempotent. This is not verified automatically as constructors are by Solidity.

## Contract Members
**Constants & Variables**

Indicates that the contract has been initialized.
```js
bool private _initialized;
```
---

Indicates that the contract is in the process of being initialized.
```js
bool private _initializing;
```
---

## Modifiers

- [initializer](#initializer)

### initializer

Modifier to protect an initializer function from being invoked twice.

```js
modifier initializer() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [_isConstructor()](#_isconstructor)

### _isConstructor

Returns true if and only if the function is running in the constructor

```js
function _isConstructor() private view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

