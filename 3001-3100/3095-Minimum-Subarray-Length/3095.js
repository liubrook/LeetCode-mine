// 3095. 或值至少 K 的最短子数组 I
// 简单
// 相关标签
// 相关企业
// 提示
// 给你一个 非负 整数数组 nums 和一个整数 k 。

// 如果一个数组中所有元素的按位或运算 OR 的值 至少 为 k ，那么我们称这个数组是 特别的 。

// 请你返回 nums 中 最短特别非空
// 子数组
// 的长度，如果特别子数组不存在，那么返回 - 1 。



// 示例 1：

// 输入：nums = [1, 2, 3], k = 2

// 输出：1

// 解释：

// 子数组[3] 的按位 OR 值为 3 ，所以我们返回 1 。

// 注意，[2] 也是一个特别子数组。

// 示例 2：

// 输入：nums = [2, 1, 8], k = 10

// 输出：3

// 解释：

// 子数组[2, 1, 8] 的按位 OR 值为 11 ，所以我们返回 3 。

// 示例 3：

// 输入：nums = [1, 2], k = 0

// 输出：1

// 解释：

// 子数组[1] 的按位 OR 值为 1 ，所以我们返回 1 。



// 提示：

// 1 <= nums.length <= 50
// 0 <= nums[i] <= 50
// 0 <= k < 64

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
  const n = nums.length;
  const bits = new Array(30).fill(0);
  let res = Number.MAX_SAFE_INTEGER;;

  const calc = (bits) => {
    let ans = 0;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] > 0) {
        ans |= 1 << i;
      }
    }
    return ans;
  };

  let left = 0;
  for (let right = 0; right < n; right++) {
    for (let i = 0; i < 30; i++) {
      bits[i] += (nums[right] >> i) & 1;
    }
    while (left <= right && calc(bits) >= k) {
      res = Math.min(res, right - left + 1);
      for (let i = 0; i < 30; i++) {
        bits[i] -= (nums[left] >> i) & 1;
      }
      left++;
    }
  }

  return res === Number.MAX_SAFE_INTEGER ? -1 : res;
};