// 719. 找出第 K 小的数对距离
// 数对(a, b) 由整数 a 和 b 组成，其数对距离定义为 a 和 b 的绝对差值。

// 给你一个整数数组 nums 和一个整数 k ，数对由 nums[i] 和 nums[j] 组成且满足 0 <= i < j < nums.length 。返回 所有数对距离中 第 k 小的数对距离。



// 示例 1：

// 输入：nums = [1, 3, 1], k = 1
// 输出：0
// 解释：数对和对应的距离如下：
// (1, 3) -> 2
//   (1, 1) -> 0
//     (3, 1) -> 2
// 距离第 1 小的数对是(1, 1) ，距离为 0 。
// 示例 2：

// 输入：nums = [1, 1, 1], k = 2
// 输出：0
// 示例 3：

// 输入：nums = [1, 6, 1], k = 3
// 输出：5


// 提示：

// n == nums.length
// 2 <= n <= 104
// 0 <= nums[i] <= 106
// 1 <= k <= n * (n - 1) / 2

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, left = 0, right = nums[n - 1] - nums[0];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let cnt = 0;
    for (let i = 0, j = 0; j < n; j++) {
      while (nums[j] - nums[i] > mid) {
        i++;
      }
      cnt += j - i;
    }
    if (cnt >= k) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};