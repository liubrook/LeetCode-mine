// 3202. 找出有效子序列的最大长度 II
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个 正 整数 k 。
// nums 的一个 子序列 sub 的长度为 x ，如果其满足以下条件，则称其为 有效子序列 ：

// (sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x - 1]) % k
// 返回 nums 的 最长有效子序列 的长度。


// 示例 1：

// 输入：nums = [1, 2, 3, 4, 5], k = 2

// 输出：5

// 解释：

// 最长有效子序列是[1, 2, 3, 4, 5] 。

// 示例 2：

// 输入：nums = [1, 4, 2, 3, 1, 4], k = 3

// 输出：4

// 解释：

// 最长有效子序列是[1, 4, 1, 4] 。



// 提示：

// 2 <= nums.length <= 10^3
// 1 <= nums[i] <= 10^7
// 1 <= k <= 10^3

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
  const dp = Array.from({ length: k }, () => new Array(k).fill(0));
  let res = 0;
  for (const num of nums) {
    const mod = num % k;
    for (let prev = 0; prev < k; prev++) {
      dp[prev][mod] = dp[mod][prev] + 1;
      res = Math.max(res, dp[prev][mod]);
    }
  }
  return res;
};