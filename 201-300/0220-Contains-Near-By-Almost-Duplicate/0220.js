// 220. 存在重复元素 III
// 给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。

// 如果存在则返回 true，不存在返回 false。



// 示例 1：

// 输入：nums = [1, 2, 3, 1], k = 3, t = 0
// 输出：true
// 示例 2：

// 输入：nums = [1, 0, 1, 1], k = 1, t = 2
// 输出：true
// 示例 3：

// 输入：nums = [1, 5, 9, 1, 5, 9], k = 2, t = 3
// 输出：false


// 提示：

// 0 <= nums.length <= 2 * 104
//   - 231 <= nums[i] <= 231 - 1
// 0 <= k <= 104
// 0 <= t <= 231 - 1

var containsNearByAlmostDuplicate = function (nums, k, t) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (Math.abs(nums[i] - nums[j]) <= t && Math.abs(i - j) <= k) {
        return true;
      }
    }
  }
  return false;
}