// 2740. 找出分区值
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个 正 整数数组 nums 。

// 将 nums 分成两个数组：nums1 和 nums2 ，并满足下述条件：

// 数组 nums 中的每个元素都属于数组 nums1 或数组 nums2 。
// 两个数组都 非空 。
// 分区值 最小 。
// 分区值的计算方法是 | max(nums1) - min(nums2) | 。

// 其中，max(nums1) 表示数组 nums1 中的最大元素，min(nums2) 表示数组 nums2 中的最小元素。

// 返回表示分区值的整数。



// 示例 1：

// 输入：nums = [1, 3, 2, 4]
// 输出：1
// 解释：可以将数组 nums 分成 nums1 = [1, 2] 和 nums2 = [3, 4] 。
// - 数组 nums1 的最大值等于 2 。
// - 数组 nums2 的最小值等于 3 。
// 分区值等于 | 2 - 3 | = 1 。
// 可以证明 1 是所有分区方案的最小值。
// 示例 2：

// 输入：nums = [100, 1, 10]
// 输出：9
// 解释：可以将数组 nums 分成 nums1 = [10] 和 nums2 = [100, 1] 。
// - 数组 nums1 的最大值等于 10 。
// - 数组 nums2 的最小值等于 1 。
// 分区值等于 | 10 - 1 | = 9 。 
// 可以证明 9 是所有分区方案的最小值。


// 提示：

// 2 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9

/**
 * @param {number[]} nums
 * @return {number}
 */
var findValueOfPartition = function (nums) {
  nums.sort((x, y) => x - y);
  let res = Infinity;
  for (let i = 1; i < nums.length; i++) {
    res = Math.min(res, nums[i] - nums[i - 1]);
  }
  return res;
};