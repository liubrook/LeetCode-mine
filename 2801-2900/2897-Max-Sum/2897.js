// 2897. 对数组执行操作使平方和最大
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始的整数数组 nums 和一个 正 整数 k 。

// 你可以对数组执行以下操作 任意次 ：

// 选择两个互不相同的下标 i 和 j ，同时 将 nums[i] 更新为 (nums[i] AND nums[j]) 且将 nums[j] 更新为 (nums[i] OR nums[j]) ，OR 表示按位 或 运算，AND 表示按位 与 运算。
// 你需要从最终的数组里选择 k 个元素，并计算它们的 平方 之和。

// 请你返回你可以得到的 最大 平方和。

// 由于答案可能会很大，将答案对 109 + 7 取余 后返回。

// 示例 1：

// 输入：nums = [2,6,5,8], k = 2
// 输出：261
// 解释：我们可以对数组执行以下操作：
// - 选择 i = 0 和 j = 3 ，同时将 nums[0] 变为 (2 AND 8) = 0 且 nums[3] 变为 (2 OR 8) = 10 ，结果数组为 nums = [0,6,5,10] 。
// - 选择 i = 2 和 j = 3 ，同时将 nums[2] 变为 (5 AND 10) = 0 且 nums[3] 变为 (5 OR 10) = 15 ，结果数组为 nums = [0,6,0,15] 。
// 从最终数组里选择元素 15 和 6 ，平方和为 152 + 62 = 261 。
// 261 是可以得到的最大结果。
// 示例 2：

// 输入：nums = [4,5,4,7], k = 3
// 输出：90
// 解释：不需要执行任何操作。
// 选择元素 7 ，5 和 4 ，平方和为 72 + 52 + 42 = 90 。
// 90 是可以得到的最大结果。

// 提示：

// 1 <= k <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSum = function (nums, k) {
  const MOD = 1000000007;
  const cnt = new Array(30).fill(0);

  // 统计每个位上 1 的数量
  for (const num of nums) {
    for (let i = 0; i < 30; i++) {
      if (num & (1 << i)) {
        cnt[i]++;
      }
    }
  }

  let res = 0;
  for (let i = 0; i < k; i++) {
    let cur = 0;
    // 从高位到低位构造当前数字
    for (let j = 29; j >= 0; j--) {
      if (cnt[j] > 0) {
        cur += Math.pow(2, j);
        cnt[j]--;
      }
    }

    const curBigInt = BigInt(cur);
    res = Number((BigInt(res) + curBigInt * curBigInt) % BigInt(MOD));
  }

  return res;
};
