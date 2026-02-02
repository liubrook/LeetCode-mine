// 3637. 三段式数组 I
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个长度为 n 的整数数组 nums。

// 如果存在索引 0 < p < q < n − 1，使得数组满足以下条件，则称其为 三段式数组（trionic）：

// nums[0...p] 严格 递增，
// nums[p...q] 严格 递减，
// nums[q...n − 1] 严格 递增。
// 如果 nums 是三段式数组，返回 true；否则，返回 false。

// 示例 1:

// 输入: nums = [1,3,5,4,2,6]

// 输出: true

// 解释:

// 选择 p = 2, q = 4：

// nums[0...2] = [1, 3, 5] 严格递增 (1 < 3 < 5)。
// nums[2...4] = [5, 4, 2] 严格递减 (5 > 4 > 2)。
// nums[4...5] = [2, 6] 严格递增 (2 < 6)。
// 示例 2:

// 输入: nums = [2,1,3]

// 输出: false

// 解释:

// 无法选出能使数组满足三段式要求的 p 和 q 。

// 提示:

// 3 <= n <= 100
// -1000 <= nums[i] <= 1000
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isTrionic = function (nums) {
  const n = nums.length;
  if (n < 3) return false;

  // 寻找峰值点 p：从左边开始，找到第一个不再递增的点
  let p = 1;
  while (p < n - 1 && nums[p] > nums[p - 1]) {
    p++;
  }
  // p 现在是递增结束的位置
  p--; // 调整到最后一个递增的位置

  // 如果第一段只有一个元素，不符合要求（需要至少2个元素）
  if (p === 0) return false;

  // 从 p 开始寻找谷值点 q：找到第一个不再递减的点
  let q = p + 1;
  while (q < n - 1 && nums[q] < nums[q - 1]) {
    q++;
  }
  // q 现在是递减结束的位置
  q--; // 调整到最后一个递减的位置

  // 检查 q 是否有效
  if (q <= p) return false;

  // 检查剩余部分是否严格递增
  for (let i = q + 1; i < n; i++) {
    if (nums[i] <= nums[i - 1]) {
      return false;
    }
  }

  // 验证所有元素都被包含在三段中
  return p > 0 && q > p && q < n - 1;
};
