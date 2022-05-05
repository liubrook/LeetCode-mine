// 713. 乘积小于 K 的子数组
// 给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。


// 示例 1：

// 输入：nums = [10, 5, 2, 6], k = 100
// 输出：8
// 解释：8 个乘积小于 100 的子数组分别为：[10]、[5]、[2],、[6]、[10, 5]、[5, 2]、[2, 6]、[5, 2, 6]。
// 需要注意的是[10, 5, 2] 并不是乘积小于 100 的子数组。
// 示例 2：

// 输入：nums = [1, 2, 3], k = 0
// 输出：0


// 提示:

// 1 <= nums.length <= 3 * 104
// 1 <= nums[i] <= 1000
// 0 <= k <= 106

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k === 0) {
    return 0;
  }
  const n = nums.length;
  const logPrefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    logPrefix[i + 1] = logPrefix[i] + Math.log(nums[i]);
  }
  const logk = Math.log(k);
  let ret = 0;
  for (let j = 0; j < n; j++) {
    let l = 0;
    let r = j + 1;
    let idx = j + 1;
    const val = logPrefix[j + 1] - logk + 1e-10;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (logPrefix[mid] > val) {
        idx = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    ret += j + 1 - idx;
  }
  return ret;
};