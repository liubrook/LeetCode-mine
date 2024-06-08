// 3040. 相同分数的最大操作数目 II
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 nums ，如果 nums 至少 包含 2 个元素，你可以执行以下操作中的 任意 一个：

// 选择 nums 中最前面两个元素并且删除它们。
// 选择 nums 中最后两个元素并且删除它们。
// 选择 nums 中第一个和最后一个元素并且删除它们。
// 一次操作的 分数 是被删除元素的和。

// 在确保 所有操作分数相同 的前提下，请你求出 最多 能进行多少次操作。

// 请你返回按照上述要求 最多 可以进行的操作次数。



// 示例 1：

// 输入：nums = [3, 2, 1, 2, 3, 4]
// 输出：3
// 解释：我们执行以下操作：
// - 删除前两个元素，分数为 3 + 2 = 5 ，nums = [1, 2, 3, 4] 。
// - 删除第一个元素和最后一个元素，分数为 1 + 4 = 5 ，nums = [2, 3] 。
// - 删除第一个元素和最后一个元素，分数为 2 + 3 = 5 ，nums = [] 。
// 由于 nums 为空，我们无法继续进行任何操作。
// 示例 2：

// 输入：nums = [3, 2, 6, 1, 4]
// 输出：2
// 解释：我们执行以下操作：
// - 删除前两个元素，分数为 3 + 2 = 5 ，nums = [6, 1, 4] 。
// - 删除最后两个元素，分数为 1 + 4 = 5 ，nums = [6] 。
// 至多进行 2 次操作。


// 提示：

// 2 <= nums.length <= 2000
// 1 <= nums[i] <= 1000

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxOperations = function (nums) {
  const n = nums.length;
  const helper = (i, j, target) => {
    const memo = Array.from({ length: n }, () => Array(n).fill(-1));
    const dfs = (i, j) => {
      if (i >= j) {
        return 0;
      }
      if (memo[i][j] != -1) {
        return memo[i][j];
      }
      let ans = 0;
      if (nums[i] + nums[i + 1] == target) {
        ans = Math.max(ans, 1 + dfs(i + 2, j));
      }
      if (nums[j - 1] + nums[j] == target) {
        ans = Math.max(ans, 1 + dfs(i, j - 2));
      }
      if (nums[i] + nums[j] == target) {
        ans = Math.max(ans, 1 + dfs(i + 1, j - 1));
      }
      memo[i][j] = ans;
      return ans;
    }
    return dfs(i, j);
  }

  let res = 0;
  res = Math.max(res, helper(0, n - 1, nums[0] + nums[n - 1]));
  res = Math.max(res, helper(0, n - 1, nums[0] + nums[1]));
  res = Math.max(res, helper(0, n - 1, nums[n - 2] + nums[n - 1]));
  return res;
};