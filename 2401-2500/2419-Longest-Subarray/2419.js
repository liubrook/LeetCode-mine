// 2419. 按位与最大的最长子数组
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个长度为 n 的整数数组 nums 。

// 考虑 nums 中进行 按位与（bitwise AND）运算得到的值 最大 的 非空 子数组。

// 换句话说，令 k 是 nums 任意 子数组执行按位与运算所能得到的最大值。那么，只需要考虑那些执行一次按位与运算后等于 k 的子数组。
// 返回满足要求的 最长 子数组的长度。

// 数组的按位与就是对数组中的所有数字进行按位与运算。

// 子数组 是数组中的一个连续元素序列。



// 示例 1：

// 输入：nums = [1, 2, 3, 3, 2, 2]
// 输出：2
// 解释：
// 子数组按位与运算的最大值是 3 。
// 能得到此结果的最长子数组是[3, 3]，所以返回 2 。
// 示例 2：

// 输入：nums = [1, 2, 3, 4]
// 输出：1
// 解释：
// 子数组按位与运算的最大值是 4 。
// 能得到此结果的最长子数组是[4]，所以返回 1 。


// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^6

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let maxValue = nums[0];
  let ans = 1, cnt = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > maxValue) {
      ans = cnt = 1;
      maxValue = nums[i];
    } else if (nums[i] < maxValue) {
      cnt = 0;
    } else if (nums[i] === maxValue) {
      cnt++;
    }
    ans = Math.max(cnt, ans);
  }
  return ans;
};