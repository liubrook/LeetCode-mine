// 1498. 满足条件的子序列数目
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个整数 target 。

// 请你统计并返回 nums 中能满足其最小元素与最大元素的 和 小于或等于 target 的 非空 子序列的数目。

// 由于答案可能很大，请将结果对 109 + 7 取余后返回。



// 示例 1：

// 输入：nums = [3,5,6,7], target = 9
// 输出：4
// 解释：有 4 个子序列满足该条件。
// [3] -> 最小元素 + 最大元素 <= target (3 + 3 <= 9)
// [3,5] -> (3 + 5 <= 9)
// [3,5,6] -> (3 + 6 <= 9)
// [3,6] -> (3 + 6 <= 9)
// 示例 2：

// 输入：nums = [3,3,6,8], target = 10
// 输出：6
// 解释：有 6 个子序列满足该条件。（nums 中可以有重复数字）
// [3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]
// 示例 3：

// 输入：nums = [2,3,3,4,6,7], target = 12
// 输出：61
// 解释：共有 63 个非空子序列，其中 2 个不满足条件（[6,7], [7]）
// 有效序列总数为（63 - 2 = 61）


// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^6
// 1 <= target <= 10^6


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const P = 1000000007;
const MAX_N = 100005;

var numSubseq = function (nums, target) {
  let f = new Array(MAX_N).fill(0);
  f[0] = 1;
  for (let i = 1; i < MAX_N; ++i) {
    f[i] = (f[i - 1] << 1) % P;
  }

  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let i = 0; i < nums.length && nums[i] * 2 <= target; ++i) {
    let maxValue = target - nums[i];
    let pos = binarySearch(nums, maxValue) - 1;
    let contribute = (pos >= i) ? f[pos - i] : 0;
    ans = (ans + contribute) % P;
  }

  return ans;
}

function binarySearch(nums, target) {
  let low = 0, high = nums.length;
  while (low < high) {
    let mid = Math.floor((high - low) / 2) + low;
    if (mid === nums.length) {
      return mid;
    }
    let num = nums[mid];
    if (num <= target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}