// 3101. 交替子数组计数
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个
// 二进制数组
// nums 。

// 如果一个
// 子数组
// 中 不存在 两个 相邻 元素的值 相同 的情况，我们称这样的子数组为 交替子数组 。

// 返回数组 nums 中交替子数组的数量。



// 示例 1：

// 输入： nums = [0, 1, 1, 1]

// 输出： 5

// 解释：

// 以下子数组是交替子数组：[0] 、[1] 、[1] 、[1] 以及[0, 1] 。

// 示例 2：

// 输入： nums = [1, 0, 1, 0]

// 输出： 10

// 解释：

// 数组的每个子数组都是交替子数组。可以统计在内的子数组共有 10 个。



// 提示：

// 1 <= nums.length <= 10^5
// nums[i] 不是 0 就是 1 。

/**
 * @param {number[]} nums
 * @return {number}
 */
var countAlternatingSubarrays = function (nums) {
  let res = 0, cur = 0, pre = -1;
  for (const a of nums) {
    cur = (pre != a) ? cur + 1 : 1;
    pre = a;
    res += cur;
  }
  return res;
};