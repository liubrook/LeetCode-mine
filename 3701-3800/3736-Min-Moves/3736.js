// 3736. 最小操作次数使数组元素相等 III
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数数组 nums。

// 在一步操作中，你可以将任意单个元素 nums[i] 的值 增加 1。

// 返回使数组中的所有元素都 相等 所需的 最小总操作次数 。

// 示例 1:

// 输入: nums = [2,1,3]

// 输出: 3

// 解释:

// 使所有元素相等的操作如下:

// 将 nums[0] = 2 增加 1, 变为 3。
// 将 nums[1] = 1 增加 1, 变为 2。
// 将 nums[1] = 2 增加 1, 变为 3。
// 现在，nums 中的所有元素都等于 3。最小总操作次数为 3。

// 示例 2:

// 输入: nums = [4,4,5]

// 输出: 2

// 解释:

// 使所有元素相等的操作如下:

// 将 nums[0] = 4 增加 1, 变为 5。
// 将 nums[1] = 4 增加 1, 变为 5。
// 现在，nums 中的所有元素都等于 5。最小总操作次数为 2。

// 提示:

// 1 <= nums.length <= 100
// 1 <= nums[i] <= 100
/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function (nums) {
  let mx = nums[0];
  for (const x of nums) {
    mx = Math.max(mx, x);
  }
  let ans = 0;
  for (const x of nums) {
    ans += mx - x;
  }
  return ans;
};
