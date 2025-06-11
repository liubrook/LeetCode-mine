// 3423. 循环数组中相邻元素的最大差值
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 循环 数组 nums ，请你找出相邻元素之间的 最大 绝对差值。

// 注意：一个循环数组中，第一个元素和最后一个元素是相邻的。



// 示例 1：

// 输入：nums = [1, 2, 4]

// 输出：3

// 解释：

// 由于 nums 是循环的，nums[0] 和 nums[2] 是相邻的，它们之间的绝对差值是最大值 | 4 - 1 | = 3 。

// 示例 2：

// 输入：nums = [-5, -10, -5]

// 输出：5

// 解释：

// 相邻元素 nums[0] 和 nums[1] 之间的绝对差值为最大值 | -5 - (-10) | = 5 。



// 提示：

// 2 <= nums.length <= 100
//   - 100 <= nums[i] <= 100

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAdjacentDistance = function (nums) {
  const n = nums.length;
  let res = Math.abs(nums[0] - nums[n - 1]);
  for (let i = 0; i < n - 1; i++) {
    res = Math.max(res, Math.abs(nums[i] - nums[i + 1]));
  }
  return res;
};