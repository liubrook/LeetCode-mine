// 2962. 统计最大元素出现至少 K 次的子数组
// 中等
// 相关标签
// 相关企业
// 给你一个整数数组 nums 和一个 正整数 k 。

// 请你统计有多少满足 「 nums 中的 最大 元素」至少出现 k 次的子数组，并返回满足这一条件的子数组的数目。

// 子数组是数组中的一个连续元素序列。



// 示例 1：

// 输入：nums = [1, 3, 2, 3, 3], k = 2
// 输出：6
// 解释：包含元素 3 至少 2 次的子数组为：[1, 3, 2, 3]、[1, 3, 2, 3, 3]、[3, 2, 3]、[3, 2, 3, 3]、[2, 3, 3] 和[3, 3] 。
// 示例 2：

// 输入：nums = [1, 4, 2, 1], k = 3
// 输出：0
// 解释：没有子数组包含元素 4 至少 3 次。


// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^6
// 1 <= k <= 10^5

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const mx = Math.max(...nums);
  let ans = 0, cnt = 0, left = 0;
  for (const x of nums) {
    if (x === mx) {
      cnt++;
    }
    while (cnt === k) {
      if (nums[left] === mx) {
        cnt--;
      }
      left++;
    }
    ans += left;
  }
  return ans;
};