// 1287. 有序数组中出现次数超过25 % 的元素
// 简单
// 相关标签
// 相关企业
// 提示
// 给你一个非递减的 有序 整数数组，已知这个数组中恰好有一个整数，它的出现次数超过数组元素总数的 25 %。

// 请你找到并返回这个整数



// 示例：

// 输入：arr = [1, 2, 2, 6, 6, 6, 6, 7, 10]
// 输出：6


// 提示：

// 1 <= arr.length <= 10 ^ 4
// 0 <= arr[i] <= 10 ^ 5

/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function (arr) {
  const n = arr.length;
  const span = Math.floor(n / 4) + 1;
  for (let i = 0; i < n; i += span) {
    const start = binarySearch(arr, arr[i]);
    const end = binarySearch(arr, arr[i] + 1);
    if (end - start >= span) {
      return arr[i];
    }
  }
  return -1;
};

const binarySearch = (arr, target) => {
  let lo = 0, hi = arr.length - 1;
  let res = arr.length;
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (arr[mid] >= target) {
      res = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return res;
}