// 3115. 质数的最大距离
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 nums。

// 返回两个（不一定不同的）质数在 nums 中 下标 的 最大距离。



// 示例 1：

// 输入： nums = [4, 2, 9, 5, 3]

// 输出： 3

// 解释： nums[1]、nums[3] 和 nums[4] 是质数。因此答案是 | 4 - 1 | = 3。

// 示例 2：

// 输入： nums = [4, 8, 2, 8]

// 输出： 0

// 解释： nums[2] 是质数。因为只有一个质数，所以答案是 | 2 - 2 | = 0。



// 提示：

// 1 <= nums.length <= 3 * 10^5
// 1 <= nums[i] <= 100
// 输入保证 nums 中至少有一个质数。

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumPrimeDifference = function (nums) {
  const primes = new Set([
    2, 3, 5, 7, 11,
    13, 17, 19, 23, 29,
    31, 37, 41, 43, 47,
    53, 59, 61, 67, 71,
    73, 79, 83, 89, 97
  ]);

  const n = nums.length;
  let first = -1, ans = 0;
  for (let i = 0; i < n; ++i) {
    if (primes.has(nums[i])) {
      if (first !== -1) {
        ans = Math.max(ans, i - first);
      } else {
        first = i;
      }
    }
  }
  return ans;
};