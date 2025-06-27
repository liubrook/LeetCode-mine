// 2099. 找到和最大的长度为 K 的子序列
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个整数 k 。你需要找到 nums 中长度为 k 的 子序列 ，且这个子序列的 和最大 。

// 请你返回 任意 一个长度为 k 的整数子序列。

// 子序列 定义为从一个数组里删除一些元素后，不改变剩下元素的顺序得到的数组。



// 示例 1：

// 输入：nums = [2,1,3,3], k = 2
// 输出：[3,3]
// 解释：
// 子序列有最大和：3 + 3 = 6 。
// 示例 2：

// 输入：nums = [-1,-2,3,4], k = 3
// 输出：[-1,3,4]
// 解释：
// 子序列有最大和：-1 + 3 + 4 = 6 。
// 示例 3：

// 输入：nums = [3,4,3,3], k = 2
// 输出：[3,4]
// 解释：
// 子序列有最大和：3 + 4 = 7 。
// 另一个可行的子序列为 [4, 3] 。


// 提示：

// 1 <= nums.length <= 1000
// -10^5 <= nums[i] <= 10^5
// 1 <= k <= nums.length

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSubsequence = function (nums, k) {
  const n = nums.length;
  const vals = []; // 辅助数组
  for (let i = 0; i < n; ++i) {
    vals.push({ index: i, value: nums[i] }) // 存储索引和值
  }
  // 按照数值降序排序
  vals.sort((x1, x2) => x2.value - x1.value);
  // 获取前 k 个并按照下标升序排序
  const topK = vals.slice(0, k); // 获取前k个元素
  topK.sort((x1, x2) => x1.index - x2.index); // 对前k个元素按索引升序排序
  const res = []; // 目标子序列
  for (let i = 0; i < k; ++i) {
    res.push(topK[i].value); // 将排序后的值加入结果
  }
  return res;
};