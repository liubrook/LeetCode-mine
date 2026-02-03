// 3640. 三段式数组 II
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个长度为 n 的整数数组 nums。

// 三段式子数组 是一个连续子数组 nums[l...r]（满足 0 <= l < r < n），并且存在下标 l < p < q < r，使得：

// nums[l...p] 严格 递增，
// nums[p...q] 严格 递减，
// nums[q...r] 严格 递增。
// 请你从数组 nums 的所有三段式子数组中找出和最大的那个，并返回其 最大 和。

// 示例 1：

// 输入：nums = [0,-2,-1,-3,0,2,-1]

// 输出：-4

// 解释：

// 选择 l = 1, p = 2, q = 3, r = 5：

// nums[l...p] = nums[1...2] = [-2, -1] 严格递增 (-2 < -1)。
// nums[p...q] = nums[2...3] = [-1, -3] 严格递减 (-1 > -3)。
// nums[q...r] = nums[3...5] = [-3, 0, 2] 严格递增 (-3 < 0 < 2)。
// 和 = (-2) + (-1) + (-3) + 0 + 2 = -4。
// 示例 2:

// 输入: nums = [1,4,2,7]

// 输出: 14

// 解释:

// 选择 l = 0, p = 1, q = 2, r = 3：

// nums[l...p] = nums[0...1] = [1, 4] 严格递增 (1 < 4)。
// nums[p...q] = nums[1...2] = [4, 2] 严格递减 (4 > 2)。
// nums[q...r] = nums[2...3] = [2, 7] 严格递增 (2 < 7)。
// 和 = 1 + 4 + 2 + 7 = 14。

// 提示:

// 4 <= n = nums.length <= 10^5
// -10^9 <= nums[i] <= 10^9
// 保证至少存在一个三段式子数组。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumTrionic = function (nums) {
  const n = nums.length;
  let ans = -Infinity;

  for (let i = 0; i < n; i++) {
    let j = i + 1;
    let res = 0;

    // 第一段: 上升段
    while (j < n && nums[j - 1] < nums[j]) {
      j++;
    }
    const p = j - 1;

    if (p === i) {
      continue;
    }

    // 第二段: 下降段
    res += nums[p] + nums[p - 1];
    while (j < n && nums[j - 1] > nums[j]) {
      res += nums[j];
      j++;
    }
    const q = j - 1;

    if (q === p || q === n - 1 || (j < n && nums[j] <= nums[q])) {
      i = q;
      continue;
    }

    // 第三段: 上升段
    res += nums[q + 1];

    // 第三段求累加最大值
    let maxSum = 0;
    let sum = 0;
    for (let k = q + 2; k < n && nums[k] > nums[k - 1]; k++) {
      sum += nums[k];
      maxSum = Math.max(maxSum, sum);
    }
    res += maxSum;

    // 第一段求累加最大值
    maxSum = 0;
    sum = 0;
    for (let k = p - 2; k >= i; k--) {
      sum += nums[k];
      maxSum = Math.max(maxSum, sum);
    }
    res += maxSum;

    // 更新答案
    ans = Math.max(ans, res);
    i = q - 1;
  }

  return ans;
};
