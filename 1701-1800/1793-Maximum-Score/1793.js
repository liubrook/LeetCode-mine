// 1793. 好子数组的最大分数
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 nums （下标从 0 开始）和一个整数 k 。

// 一个子数组(i, j) 的 分数 定义为 min(nums[i], nums[i + 1], ..., nums[j]) * (j - i + 1) 。一个 好 子数组的两个端点下标需要满足 i <= k <= j 。

// 请你返回 好 子数组的最大可能 分数 。



// 示例 1：

// 输入：nums = [1, 4, 3, 7, 4, 5], k = 3
// 输出：15
// 解释：最优子数组的左右端点下标是(1, 5) ，分数为 min(4, 3, 7, 4, 5) * (5 - 1 + 1) = 3 * 5 = 15 。
// 示例 2：

// 输入：nums = [5, 5, 4, 5, 4, 1, 1, 1], k = 0
// 输出：20
// 解释：最优子数组的左右端点下标是(0, 4) ，分数为 min(5, 5, 4, 5, 4) * (4 - 0 + 1) = 4 * 5 = 20 。


// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 2 * 10^4
// 0 <= k < nums.length

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {
  let l = k, r = k, n = nums.length, res = 0; // 定义左右边界l r, 最大可能分数res
  while (1) {
    while (r < n && nums[r] >= nums[k]) r++; //向右寻找以nums[k]为最小值的好子数组
    while (l >= 0 && nums[l] >= nums[k]) l--; //向左寻找以nums[k]为最小值的好子数组
    res = Math.max(res, (r - l - 1) * nums[k]);  //更新最大可能分数
    if (l < 0 && r == n) break; //遍历完数组，直接退出循环
    if (l >= 0 && r < n) nums[k] = Math.max(nums[l], nums[r]); //更新nums[k] 为左右边界中的较大者
    else if (l < 0) nums[k] = nums[r]; //左边遍历完了，更新nums[k]为右边界
    else nums[k] = nums[l]; //右边遍历完了，更新nums[k]为左边界
  }
  return res;
};