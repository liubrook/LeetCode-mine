// 2918. 数组的最小相等和
// 中等
// 相关标签
// 相关企业
// 提示
// 给你两个由正整数和 0 组成的数组 nums1 和 nums2 。

// 你必须将两个数组中的 所有 0 替换为 严格 正整数，并且满足两个数组中所有元素的和 相等 。

// 返回 最小 相等和 ，如果无法使两数组相等，则返回 - 1 。



// 示例 1：

// 输入：nums1 = [3, 2, 0, 1, 0], nums2 = [6, 5, 0]
// 输出：12
// 解释：可以按下述方式替换数组中的 0 ：
// - 用 2 和 4 替换 nums1 中的两个 0 。得到 nums1 = [3, 2, 2, 1, 4] 。
// - 用 1 替换 nums2 中的一个 0 。得到 nums2 = [6, 5, 1] 。
// 两个数组的元素和相等，都等于 12 。可以证明这是可以获得的最小相等和。
// 示例 2：

// 输入：nums1 = [2, 0, 2, 0], nums2 = [1, 4]
// 输出：-1
// 解释：无法使两个数组的和相等。


// 提示：

// 1 <= nums1.length, nums2.length <= 10^5
// 0 <= nums1[i], nums2[i] <= 10^6

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minSum = function (nums1, nums2) {
  let sum1 = 0, sum2 = 0;
  let zero1 = 0, zero2 = 0;

  for (let i of nums1) {
    sum1 += i;
    if (i === 0) {
      sum1++;
      zero1++;
    }
  }

  for (let i of nums2) {
    sum2 += i;
    if (i === 0) {
      sum2++;
      zero2++;
    }
  }

  if ((zero1 === 0 && sum2 > sum1) || (zero2 === 0 && sum1 > sum2)) {
    return -1;
  }

  return Math.max(sum1, sum2);
};