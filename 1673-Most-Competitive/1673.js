// 1673. 找出最具竞争力的子序列
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个正整数 k ，返回长度为 k 且最具 竞争力 的 nums 子序列。

// 数组的子序列是从数组中删除一些元素（可能不删除元素）得到的序列。

// 在子序列 a 和子序列 b 第一个不相同的位置上，如果 a 中的数字小于 b 中对应的数字，那么我们称子序列 a 比子序列 b（相同长度下）更具 竞争力 。 例如，[1, 3, 4] 比[1, 3, 5] 更具竞争力，在第一个不相同的位置，也就是最后一个位置上， 4 小于 5 。



// 示例 1：

// 输入：nums = [3, 5, 2, 6], k = 2
// 输出：[2, 6]
// 解释：在所有可能的子序列集合 { [3, 5], [3, 2], [3, 6], [5, 2], [5, 6], [2, 6] } 中，[2, 6] 最具竞争力。
// 示例 2：

// 输入：nums = [2, 4, 3, 3, 5, 4, 9, 6], k = 4
// 输出：[2, 3, 3, 4]


// 提示：

// 1 <= nums.length <= 10^5
// 0 <= nums[i] <= 10^9
// 1 <= k <= nums.length

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var mostCompetitive = function (nums, k) {
  const res = [];
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (res.length > 0 && n - i + res.length > k && res[res.length - 1] > nums[i]) {
      res.pop();
    }
    res.push(nums[i]);
  }
  res.length = k;
  return res;
};