// 2563. 统计公平数对的数目
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个下标从 0 开始、长度为 n 的整数数组 nums ，和两个整数 lower 和 upper ，返回 公平数对的数目 。

// 如果(i, j) 数对满足以下情况，则认为它是一个 公平数对 ：

// 0 <= i < j < n，且
// lower <= nums[i] + nums[j] <= upper


// 示例 1：

// 输入：nums = [0, 1, 7, 4, 4, 5], lower = 3, upper = 6
// 输出：6
// 解释：共计 6 个公平数对：(0, 3)、(0, 4)、(0, 5)、(1, 3)、(1, 4) 和(1, 5) 。
// 示例 2：

// 输入：nums = [1, 7, 9, 2, 5], lower = 11, upper = 11
// 输出：1
// 解释：只有单个公平数对：(2, 3) 。


// 提示：

// 1 <= nums.length <= 10^5
// nums.length == n
//   - 10^9 <= nums[i] <= 10^9
//   - 10^9 <= lower <= upper <= 10^9

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  nums.sort((a, b) => a - b);
  let ans = 0;
  let left = nums.length, right = nums.length;

  for (let j = 0; j < nums.length; j++) {
    while (right > 0 && nums[right - 1] > upper - nums[j]) {
      right--;
    }
    while (left > 0 && nums[left - 1] >= lower - nums[j]) {
      left--;
    }
    ans += Math.min(right, j) - Math.min(left, j);
  }

  return ans;
};