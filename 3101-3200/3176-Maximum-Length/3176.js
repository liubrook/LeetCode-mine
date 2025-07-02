// 3176. 求出最长好子序列 I
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个 非负 整数 k 。如果一个整数序列 seq 满足在范围下标范围[0, seq.length - 2] 中存在 不超过 k 个下标 i 满足 seq[i] != seq[i + 1] ，那么我们称这个整数序列为 好 序列。

// 请你返回 nums 中 好
// 子序列
// 的最长长度



// 示例 1：

// 输入：nums = [1, 2, 1, 1, 3], k = 2

// 输出：4

// 解释：

// 最长好子序列为[1, 2, 1, 1, 3] 。

// 示例 2：

// 输入：nums = [1, 2, 3, 4, 5, 1], k = 0

// 输出：2

// 解释：

// 最长好子序列为[1, 2, 3, 4, 5, 1] 。



// 提示：

// 1 <= nums.length <= 500
// 1 <= nums[i] <= 10^9
// 0 <= k <= min(nums.length, 25)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
  const dp = Array.from({ length: nums.length }, () => Array(51).fill(-1));
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    dp[i][0] = 1;
    for (let l = 0; l <= k; l++) {
      for (let j = 0; j < i; j++) {
        const add = nums[i] !== nums[j] ? 1 : 0;
        if (l - add >= 0 && dp[j][l - add] !== -1) {
          dp[i][l] = Math.max(dp[i][l], dp[j][l - add] + 1);
        }
      }
      ans = Math.max(ans, dp[i][l]);
    }
  }

  return ans;
};