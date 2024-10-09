// 3162. 优质数对的总数 I
// 简单
// 相关标签
// 相关企业
// 提示
// 给你两个整数数组 nums1 和 nums2，长度分别为 n 和 m。同时给你一个正整数 k。

// 如果 nums1[i] 可以被 nums2[j] * k 整除，则称数对(i, j) 为 优质数对（0 <= i <= n - 1, 0 <= j <= m - 1）。

// 返回 优质数对 的总数。



// 示例 1：

// 输入：nums1 = [1, 3, 4], nums2 = [1, 3, 4], k = 1

// 输出：5

// 解释：

// 5个优质数对分别是(0, 0), (1, 0), (1, 1), (2, 0), 和(2, 2)。

// 示例 2：

// 输入：nums1 = [1, 2, 4, 12], nums2 = [2, 4], k = 3

// 输出：2

// 解释：

// 2个优质数对分别是(3, 0) 和(3, 1)。



// 提示：

// 1 <= n, m <= 50
// 1 <= nums1[i], nums2[j] <= 50
// 1 <= k <= 50

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let res = 0;
  for (let a of nums1) {
    for (let b of nums2) {
      if (a % (b * k) === 0) {
        res++;
      }
    }
  }
  return res;
};