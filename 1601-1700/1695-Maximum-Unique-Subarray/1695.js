// 1695. 删除子数组的最大得分
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个正整数数组 nums ，请你从中删除一个含有 若干不同元素 的子数组。删除子数组的 得分 就是子数组各元素之 和 。

// 返回 只删除一个 子数组可获得的 最大得分 。

// 如果数组 b 是数组 a 的一个连续子序列，即如果它等于 a[l], a[l + 1],..., a[r] ，那么它就是 a 的一个子数组。



// 示例 1：

// 输入：nums = [4, 2, 4, 5, 6]
// 输出：17
// 解释：最优子数组是[2, 4, 5, 6]
// 示例 2：

// 输入：nums = [5, 2, 1, 2, 5, 2, 1, 2, 5]
// 输出：8
// 解释：最优子数组是[5, 2, 1] 或[1, 2, 5]


// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^4

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumUniqueSubarray = function (nums) {
  const n = nums.length;
  const seen = new Set();
  let ans = 0, psum = 0;
  for (let i = 0, j = 0; i < n; ++i) {
    psum += nums[i];
    while (seen.has(nums[i])) {
      seen.delete(nums[j]);
      psum -= nums[j];
      j++;
    }
    seen.add(nums[i]);
    ans = Math.max(ans, psum);
  }
  return ans;
};