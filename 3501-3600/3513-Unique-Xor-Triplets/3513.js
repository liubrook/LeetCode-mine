// 3513. 不同 XOR 三元组的数目 I
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个长度为 n 的整数数组 nums，其中 nums 是范围 [1, n] 内所有数的 排列 。

// XOR 三元组 定义为三个元素的异或值 nums[i] XOR nums[j] XOR nums[k]，其中 i <= j <= k。

// 返回所有可能三元组 (i, j, k) 中 不同 的 XOR 值的数量。

// 排列 是一个集合中所有元素的重新排列。

// 示例 1：

// 输入： nums = [1,2]

// 输出： 2

// 解释：

// 所有可能的 XOR 三元组值为：

// (0, 0, 0) → 1 XOR 1 XOR 1 = 1
// (0, 0, 1) → 1 XOR 1 XOR 2 = 2
// (0, 1, 1) → 1 XOR 2 XOR 2 = 1
// (1, 1, 1) → 2 XOR 2 XOR 2 = 2
// 不同的 XOR 值为 {1, 2}，因此输出为 2。

// 示例 2：

// 输入： nums = [3,1,2]

// 输出： 4

// 解释：

// 可能的 XOR 三元组值包括：

// (0, 0, 0) → 3 XOR 3 XOR 3 = 3
// (0, 0, 1) → 3 XOR 3 XOR 1 = 1
// (0, 0, 2) → 3 XOR 3 XOR 2 = 2
// (0, 1, 2) → 3 XOR 1 XOR 2 = 0
// 不同的 XOR 值为 {0, 1, 2, 3}，因此输出为 4。

// 提示：

// 1 <= n == nums.length <= 10^5
// 1 <= nums[i] <= n
// nums 是从 1 到 n 的整数的一个排列。
/**
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function (nums) {
  const n = nums.length;
  if (n <= 2) {
    return n;
  }
  let ans = 1;
  while (ans <= n) {
    ans <<= 1;
  }
  return ans;
};
