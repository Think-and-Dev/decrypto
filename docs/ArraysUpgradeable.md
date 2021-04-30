---
id: version-0.1.0-ArraysUpgradeable
title: ArraysUpgradeable
original_id: ArraysUpgradeable
---

# ArraysUpgradeable.sol

View Source: [contracts/zeppelin/utils/ArraysUpgradeable.sol](../contracts/zeppelin/utils/ArraysUpgradeable.sol)

**ArraysUpgradeable** - version: 0.1.0

Collection of functions related to array types.

## Functions

- [findUpperBound(uint256[] array, uint256 element)](#findupperbound)

### findUpperBound

Searches a sorted `array` and returns the first index that contains
 a value greater or equal to `element`. If no such index exists (i.e. all
 values in the array are strictly less than `element`), the array length is
 returned. Time complexity O(log n).
 `array` is expected to be sorted in ascending order, and to contain no
 repeated elements.

```js
function findUpperBound(uint256[] array, uint256 element) internal view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| array | uint256[] |  | 
| element | uint256 |  | 

