// 3718. 缺失的最小倍数
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个整数 k，请返回从 nums 中缺失的、最小的正整数 k 的倍数。

// 倍数 指能被 k 整除的任意正整数。

// 示例 1：

// 输入： nums = [8,2,3,4,6], k = 2

// 输出： 10

// 解释：

// 当 k = 2 时，其倍数为 2、4、6、8、10、12……，其中在 nums 中缺失的最小倍数是 10。

// 示例 2：

// 输入： nums = [1,4,7,10,15], k = 5

// 输出： 5

// 解释：

// 当 k = 5 时，其倍数为 5、10、15、20……，其中在 nums 中缺失的最小倍数是 5。

// 提示：

// 1 <= nums.length <= 100
// 1 <= nums[i] <= 100
// 1 <= k <= 100
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingMultiple = function (nums, k) {
  const seen = new Set(nums);
  let ans = k;
  while (seen.has(ans)) {
    ans += k;
  }
  return ans;
};
