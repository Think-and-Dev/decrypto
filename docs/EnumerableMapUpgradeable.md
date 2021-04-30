---
id: version-0.1.0-EnumerableMapUpgradeable
title: EnumerableMapUpgradeable
original_id: EnumerableMapUpgradeable
---

# EnumerableMapUpgradeable.sol

View Source: [contracts/zeppelin/utils/EnumerableMapUpgradeable.sol](../contracts/zeppelin/utils/EnumerableMapUpgradeable.sol)

**EnumerableMapUpgradeable** - version: 0.1.0

Library for managing an enumerable variant of Solidity's
 https://solidity.readthedocs.io/en/latest/types.html#mapping-types[`mapping`]
 type.
 Maps have the following properties:
 - Entries are added, removed, and checked for existence in constant time
 (O(1)).
 - Entries are enumerated in O(n). No guarantees are made on the ordering.
 ```
 contract Example {
     // Add the library methods
     using EnumerableMap for EnumerableMap.UintToAddressMap;
     // Declare a set state variable
     EnumerableMap.UintToAddressMap private myMap;
 }
 ```
 As of v3.0.0, only maps of type `uint256 -> address` (`UintToAddressMap`) are
 supported.

## Structs
### MapEntry

```js
struct MapEntry {
 bytes32 _key,
 bytes32 _value
}
```

### Map

```js
struct Map {
 struct EnumerableMapUpgradeable.MapEntry[] _entries,
 mapping(bytes32 => uint256) _indexes
}
```

### UintToAddressMap

```js
struct UintToAddressMap {
 struct EnumerableMapUpgradeable.Map _inner
}
```

## Functions

- [_set(struct EnumerableMapUpgradeable.Map map, bytes32 key, bytes32 value)](#_set)
- [_remove(struct EnumerableMapUpgradeable.Map map, bytes32 key)](#_remove)
- [_contains(struct EnumerableMapUpgradeable.Map map, bytes32 key)](#_contains)
- [_length(struct EnumerableMapUpgradeable.Map map)](#_length)
- [_at(struct EnumerableMapUpgradeable.Map map, uint256 index)](#_at)
- [_tryGet(struct EnumerableMapUpgradeable.Map map, bytes32 key)](#_tryget)
- [_get(struct EnumerableMapUpgradeable.Map map, bytes32 key)](#_get)
- [_get(struct EnumerableMapUpgradeable.Map map, bytes32 key, string errorMessage)](#_get)
- [set(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key, address value)](#set)
- [remove(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key)](#remove)
- [contains(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key)](#contains)
- [length(struct EnumerableMapUpgradeable.UintToAddressMap map)](#length)
- [at(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 index)](#at)
- [tryGet(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key)](#tryget)
- [get(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key)](#get)
- [get(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key, string errorMessage)](#get)

### _set

Adds a key-value pair to a map, or updates the value for an existing
 key. O(1).
 Returns true if the key was added to the map, that is if it was not
 already present.

```js
function _set(struct EnumerableMapUpgradeable.Map map, bytes32 key, bytes32 value) private nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.Map |  | 
| key | bytes32 |  | 
| value | bytes32 |  | 

### _remove

Removes a key-value pair from a map. O(1).
 Returns true if the key was removed from the map, that is if it was present.

```js
function _remove(struct EnumerableMapUpgradeable.Map map, bytes32 key) private nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.Map |  | 
| key | bytes32 |  | 

### _contains

Returns true if the key is in the map. O(1).

```js
function _contains(struct EnumerableMapUpgradeable.Map map, bytes32 key) private view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.Map |  | 
| key | bytes32 |  | 

### _length

Returns the number of key-value pairs in the map. O(1).

```js
function _length(struct EnumerableMapUpgradeable.Map map) private view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.Map |  | 

### _at

Returns the key-value pair stored at position `index` in the map. O(1).
 Note that there are no guarantees on the ordering of entries inside the
 array, and it may change when more entries are added or removed.
 Requirements:
 - `index` must be strictly less than {length}.

```js
function _at(struct EnumerableMapUpgradeable.Map map, uint256 index) private view
returns(bytes32, bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.Map |  | 
| index | uint256 |  | 

### _tryGet

Tries to returns the value associated with `key`.  O(1).
 Does not revert if `key` is not in the map.

```js
function _tryGet(struct EnumerableMapUpgradeable.Map map, bytes32 key) private view
returns(bool, bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.Map |  | 
| key | bytes32 |  | 

### _get

Returns the value associated with `key`.  O(1).
 Requirements:
 - `key` must be in the map.

```js
function _get(struct EnumerableMapUpgradeable.Map map, bytes32 key) private view
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.Map |  | 
| key | bytes32 |  | 

### _get

Same as {_get}, with a custom error message when `key` is not in the map.
 CAUTION: This function is deprecated because it requires allocating memory for the error
 message unnecessarily. For custom revert reasons use {_tryGet}.

```js
function _get(struct EnumerableMapUpgradeable.Map map, bytes32 key, string errorMessage) private view
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.Map |  | 
| key | bytes32 |  | 
| errorMessage | string |  | 

### set

Adds a key-value pair to a map, or updates the value for an existing
 key. O(1).
 Returns true if the key was added to the map, that is if it was not
 already present.

```js
function set(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key, address value) internal nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.UintToAddressMap |  | 
| key | uint256 |  | 
| value | address |  | 

### remove

Removes a value from a set. O(1).
 Returns true if the key was removed from the map, that is if it was present.

```js
function remove(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key) internal nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.UintToAddressMap |  | 
| key | uint256 |  | 

### contains

Returns true if the key is in the map. O(1).

```js
function contains(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key) internal view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.UintToAddressMap |  | 
| key | uint256 |  | 

### length

Returns the number of elements in the map. O(1).

```js
function length(struct EnumerableMapUpgradeable.UintToAddressMap map) internal view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.UintToAddressMap |  | 

### at

Returns the element stored at position `index` in the set. O(1).
 Note that there are no guarantees on the ordering of values inside the
 array, and it may change when more values are added or removed.
 Requirements:
 - `index` must be strictly less than {length}.

```js
function at(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 index) internal view
returns(uint256, address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.UintToAddressMap |  | 
| index | uint256 |  | 

### tryGet

Tries to returns the value associated with `key`.  O(1).
 Does not revert if `key` is not in the map.
 _Available since v3.4._

```js
function tryGet(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key) internal view
returns(bool, address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.UintToAddressMap |  | 
| key | uint256 |  | 

### get

Returns the value associated with `key`.  O(1).
 Requirements:
 - `key` must be in the map.

```js
function get(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key) internal view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.UintToAddressMap |  | 
| key | uint256 |  | 

### get

Same as {get}, with a custom error message when `key` is not in the map.
 CAUTION: This function is deprecated because it requires allocating memory for the error
 message unnecessarily. For custom revert reasons use {tryGet}.

```js
function get(struct EnumerableMapUpgradeable.UintToAddressMap map, uint256 key, string errorMessage) internal view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| map | struct EnumerableMapUpgradeable.UintToAddressMap |  | 
| key | uint256 |  | 
| errorMessage | string |  | 

