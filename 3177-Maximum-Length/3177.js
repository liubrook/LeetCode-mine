// 3177. 求出最长好子序列 II
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个 非负 整数 k 。如果一个整数序列 seq 满足在范围下标范围[0, seq.length - 2] 中存在 不超过 k 个下标 i 满足 seq[i] != seq[i + 1] ，那么我们称这个整数序列为 好 序列。

// 请你返回 nums 中 好
// 子序列
// 的最长长度



// 示例 1：

// 输入：nums = [1, 2, 1, 1, 3], k = 2

// 输出：4

// 解释：

// 最长好子序列为[1, 2, 1, 1, 3] 。

// 示例 2：

// 输入：nums = [1, 2, 3, 4, 5, 1], k = 0

// 输出：2

// 解释：

// 最长好子序列为[1, 2, 3, 4, 5, 1] 。



// 提示：

// 1 <= nums.length <= 5 * 10^3
// 1 <= nums[i] <= 10^9
// 0 <= k <= min(50, nums.length)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
  const dp = new Map();
  const zd = Array(k + 1).fill(0);
  nums.forEach(v => {
    if (!dp.has(v)) {
      dp.set(v, Array(k + 1).fill(0));
    }

    const tmp = dp.get(v);
    for (let j = 0; j <= k; j++) {
      tmp[j]++;
      if (j > 0) {
        tmp[j] = Math.max(tmp[j], zd[j - 1] + 1);
      }
    }

    for (let j = 0; j <= k; j++) {
      zd[j] = Math.max(zd[j], tmp[j]);
    }
  });

  return zd[k];
};