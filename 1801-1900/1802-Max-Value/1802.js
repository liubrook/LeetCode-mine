// 1802. 有界数组中指定下标处的最大值
// 给你三个正整数 n、index 和 maxSum 。你需要构造一个同时满足下述所有条件的数组 nums（下标 从 0 开始 计数）：

// nums.length == n
// nums[i] 是 正整数 ，其中 0 <= i < n
// abs(nums[i] - nums[i + 1]) <= 1 ，其中 0 <= i < n - 1
// nums 中所有元素之和不超过 maxSum
// nums[index] 的值被 最大化
// 返回你所构造的数组中的 nums[index] 。

// 注意：abs(x) 等于 x 的前提是 x >= 0 ；否则，abs(x) 等于 - x 。



// 示例 1：

// 输入：n = 4, index = 2, maxSum = 6
// 输出：2
// 解释：数组[1, 1, 2, 1] 和[1, 2, 2, 1] 满足所有条件。不存在其他在指定下标处具有更大值的有效数组。
// 示例 2：

// 输入：n = 6, index = 1, maxSum = 10
// 输出：3


// 提示：

// 1 <= n <= maxSum <= 10^9
// 0 <= index < n


/**
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
var maxValue = function (n, index, maxSum) {
  let left = 1, right = maxSum;
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    if (valid(mid, n, index, maxSum)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

const valid = (mid, n, index, maxSum) => {
  let left = index;
  let right = n - index - 1;
  return mid + cal(mid, left) + cal(mid, right) <= maxSum;
}

const cal = (big, length) => {
  if (length + 1 < big) {
    const small = big - length;
    return Math.floor((big - 1 + small) * length / 2);
  } else {
    const ones = length - (big - 1);
    return Math.floor(big * (big - 1) / 2) + ones;
  }
};