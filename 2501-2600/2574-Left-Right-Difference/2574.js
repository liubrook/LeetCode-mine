// 2574. 左右元素和的差值
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始的长度为 n 的整数数组 nums。

// 定义两个数组 leftSum 和 rightSum，其中：

// leftSum[i] 是数组 nums 中下标 i 左侧元素之和。如果不存在对应的元素，leftSum[i] = 0 。
// rightSum[i] 是数组 nums 中下标 i 右侧元素之和。如果不存在对应的元素，rightSum[i] = 0 。
// 返回长度为 n 数组 answer，其中 answer[i] = |leftSum[i] - rightSum[i]|。

// 示例 1：

// 输入：nums = [10,4,8,3]
// 输出：[15,1,11,22]
// 解释：数组 leftSum 为 [0,10,14,22] 且数组 rightSum 为 [15,11,3,0] 。
// 数组 answer 为 [|0 - 15|,|10 - 11|,|14 - 3|,|22 - 0|] = [15,1,11,22] 。
// 示例 2：

// 输入：nums = [1]
// 输出：[0]
// 解释：数组 leftSum 为 [0] 且数组 rightSum 为 [0] 。
// 数组 answer 为 [|0 - 0|] = [0] 。

// 提示：

// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 10^5
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function (nums) {
  const n = nums.length;
  const ans = new Array(n);

  let leftSum = 0;
  for (let i = 0; i < n; i++) {
    ans[i] = leftSum;
    leftSum += nums[i];
  }
  let rightSum = 0;
  for (let i = n - 1; i >= 0; i--) {
    ans[i] = Math.abs(ans[i] - rightSum);
    rightSum += nums[i];
  }
  return ans;
};
leftRightDifference([10, 4, 8, 3]);
