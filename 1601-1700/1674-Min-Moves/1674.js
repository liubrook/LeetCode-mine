// 1674. 使数组互补的最少操作次数
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个长度为 偶数 n 的整数数组 nums 和一个整数 limit 。每一次操作，你可以将 nums 中的任何整数替换为 1 到 limit 之间的另一个整数。

// 如果对于所有下标 i（下标从 0 开始），nums[i] + nums[n - 1 - i] 都等于同一个数，则数组 nums 是 互补的 。例如，数组 [1,2,3,4] 是互补的，因为对于所有下标 i ，nums[i] + nums[n - 1 - i] = 5 。

// 返回使数组 互补 的 最少 操作次数。

// 示例 1：

// 输入：nums = [1,2,4,3], limit = 4
// 输出：1
// 解释：经过 1 次操作，你可以将数组 nums 变成 [1,2,2,3]（加粗元素是变更的数字）：
// nums[0] + nums[3] = 1 + 3 = 4.
// nums[1] + nums[2] = 2 + 2 = 4.
// nums[2] + nums[1] = 2 + 2 = 4.
// nums[3] + nums[0] = 3 + 1 = 4.
// 对于每个 i ，nums[i] + nums[n-1-i] = 4 ，所以 nums 是互补的。
// 示例 2：

// 输入：nums = [1,2,2,1], limit = 2
// 输出：2
// 解释：经过 2 次操作，你可以将数组 nums 变成 [2,2,2,2] 。你不能将任何数字变更为 3 ，因为 3 > limit 。
// 示例 3：

// 输入：nums = [1,2,1,2], limit = 2
// 输出：0
// 解释：nums 已经是互补的。

// 提示：

// n == nums.length
// 2 <= n <= 10^5
// 1 <= nums[i] <= limit <= 10^5
// n 是偶数。
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var minMoves = function (nums, limit) {
  const n = nums.length;
  const sumCount = new Map();
  const minArr = [];
  const maxArr = [];

  for (let i = 0; i < n / 2; i++) {
    const a = Math.min(nums[i], nums[n - 1 - i]);
    const b = Math.max(nums[i], nums[n - 1 - i]);

    const sum = a + b;
    sumCount.set(sum, (sumCount.get(sum) ?? 0) + 1);

    minArr.push(a);
    maxArr.push(b);
  }

  minArr.sort((x, y) => x - y);
  maxArr.sort((x, y) => x - y);

  const lowerBound = (arr, target) => {
    let left = 0,
      right = arr.length;
    while (left < right) {
      const mid = left + ((right - left) >>> 1);
      if (arr[mid] >= target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  };

  let minOps = n;

  for (let c = 2; c <= 2 * limit; c++) {
    const addLeft = n / 2 - lowerBound(minArr, c);
    const addRight = lowerBound(maxArr, c - limit);

    const currentOps = n / 2 + addLeft + addRight - (sumCount.get(c) ?? 0);
    minOps = Math.min(minOps, currentOps);
  }

  return minOps;
};
