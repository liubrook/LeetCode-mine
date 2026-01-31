// 3010. 将数组分成最小总代价的子数组 I
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 给你一个长度为 n 的整数数组 nums 。

// 一个数组的 代价 是它的 第一个 元素。比方说，[1,2,3] 的代价是 1 ，[3,4,1] 的代价是 3 。

// 你需要将 nums 分成 3 个 连续且没有交集 的子数组。

// 请你返回这些子数组的 最小 代价 总和 。

// 示例 1：

// 输入：nums = [1,2,3,12]
// 输出：6
// 解释：最佳分割成 3 个子数组的方案是：[1] ，[2] 和 [3,12] ，总代价为 1 + 2 + 3 = 6 。
// 其他得到 3 个子数组的方案是：
// - [1] ，[2,3] 和 [12] ，总代价是 1 + 2 + 12 = 15 。
// - [1,2] ，[3] 和 [12] ，总代价是 1 + 3 + 12 = 16 。
// 示例 2：

// 输入：nums = [5,4,3]
// 输出：12
// 解释：最佳分割成 3 个子数组的方案是：[5] ，[4] 和 [3] ，总代价为 5 + 4 + 3 = 12 。
// 12 是所有分割方案里的最小总代价。
// 示例 3：

// 输入：nums = [10,3,1,1]
// 输出：12
// 解释：最佳分割成 3 个子数组的方案是：[10,3] ，[1] 和 [1] ，总代价为 10 + 1 + 1 = 12 。
// 12 是所有分割方案里的最小总代价。

// 提示：

// 3 <= n <= 50
// 1 <= nums[i] <= 50
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumCost = function (nums) {
  let first = Number.MAX_SAFE_INTEGER;
  let second = Number.MAX_SAFE_INTEGER;

  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    if (x < first) {
      second = first;
      first = x;
    } else if (x < second) {
      second = x;
    }
  }
  return nums[0] + first + second;
};
