// 632. 最小区间
// 困难
// 相关标签
// 相关企业
// 你有 k 个 非递减排列 的整数列表。找到一个 最小 区间，使得 k 个列表中的每个列表至少有一个数包含在其中。

// 我们定义如果 b - a < d - c 或者在 b - a == d - c 时 a < c，则区间[a, b] 比[c, d] 小。



// 示例 1：

// 输入：nums = [[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]
// 输出：[20, 24]
// 解释： 
// 列表 1：[4, 10, 15, 24, 26]，24 在区间[20, 24] 中。
// 列表 2：[0, 9, 12, 20]，20 在区间[20, 24] 中。
// 列表 3：[5, 18, 22, 30]，22 在区间[20, 24] 中。
// 示例 2：

// 输入：nums = [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
// 输出：[1, 1]


// 提示：

// nums.length == k
// 1 <= k <= 3500
// 1 <= nums[i].length <= 50
//   - 105 <= nums[i][j] <= 10^5
// nums[i] 按非递减顺序排列

/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function (nums) {
  let rangeLeft = 0, rangeRight = Number.MAX_SAFE_INTEGER;
  const size = nums.length;
  const next = new Array(size).fill(0);
  const pq = new MinPriorityQueue();
  let minValue = 0, maxValue = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < size; ++i) {
    pq.enqueue(i, nums[i][next[i]]);
    maxValue = Math.max(maxValue, nums[i][0]);
  }

  while (true) {
    const row = pq.dequeue().element;
    minValue = nums[row][next[row]];
    if (maxValue - minValue < rangeRight - rangeLeft) {
      rangeLeft = minValue;
      rangeRight = maxValue;
    }
    if (next[row] === nums[row].length - 1) {
      break;
    }
    ++next[row];
    maxValue = Math.max(maxValue, nums[row][next[row]]);
    pq.enqueue(row, nums[row][next[row]]);
  }

  return [rangeLeft, rangeRight];
};