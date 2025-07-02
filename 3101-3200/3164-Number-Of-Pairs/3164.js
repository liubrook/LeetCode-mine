// 3164. 优质数对的总数 II
// 中等
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

// 1 <= n, m <= 10^5
// 1 <= nums1[i], nums2[j] <= 10^6
// 1 <= k <= 10^3

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  const count = {};
  const count2 = {};
  let res = 0, max1 = 0;
  for (let num of nums1) {
    count[num] = (count[num] || 0) + 1;
    max1 = Math.max(max1, num);
  }
  for (let num of nums2) {
    count2[num] = (count2[num] || 0) + 1;
  }
  for (let a in count2) {
    let cnt = count2[a];
    for (let b = a * k; b <= max1; b += a * k) {
      if (b in count) {
        res += count[b] * cnt;
      }
    }
  }
  return res;
};