// 3287. 求出数组中最大序列值
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个 正 整数 k 。

// 定义长度为 2 * x 的序列 seq 的 值 为：

// (seq[0] OR seq[1] OR ... OR seq[x - 1]) XOR(seq[x] OR seq[x + 1] OR ...OR seq[2 * x - 1]).
// 请你求出 nums 中所有长度为 2 * k 的
// 子序列
//  的 最大值 。



// 示例 1：

// 输入：nums = [2, 6, 7], k = 1

// 输出：5

// 解释：

// 子序列[2, 7] 的值最大，为 2 XOR 7 = 5 。

// 示例 2：

// 输入：nums = [4, 2, 5, 6, 7], k = 2

// 输出：2

// 解释：

// 子序列[4, 5, 6, 7] 的值最大，为(4 OR 5) XOR(6 OR 7) = 2 。



// 提示：

// 2 <= nums.length <= 400
// 1 <= nums[i] < 27
// 1 <= k <= nums.length / 2

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxValue = function (nums, k) {
  function findORs(nums, k) {
    const dp = [];
    const prev = Array.from({ length: k + 1 }, () => new Set());
    prev[0].add(0);

    for (let i = 0; i < nums.length; i++) {
      for (let j = Math.min(k - 1, i + 1); j >= 0; j--) {
        for (const x of prev[j]) {
          prev[j + 1].add(x | nums[i]);
        }
      }
      dp.push(new Set(prev[k]));
    }
    return dp;
  }

  const A = findORs(nums, k);
  nums.reverse();
  const B = findORs(nums, k);
  let mx = 0;

  for (let i = k - 1; i < nums.length - k; i++) {
    for (const a of A[i]) {
      for (const b of B[nums.length - i - 2]) {
        mx = Math.max(mx, a ^ b);
      }
    }
  }
  return mx;
};