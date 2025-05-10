// 1550. 存在连续三个奇数的数组
// 已解答
// 简单
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 arr，请你判断数组中是否存在连续三个元素都是奇数的情况：如果存在，请返回 true ；否则，返回 false 。



// 示例 1：

// 输入：arr = [2, 6, 4, 1]
// 输出：false
// 解释：不存在连续三个元素都是奇数的情况。
// 示例 2：

// 输入：arr = [1, 2, 34, 3, 4, 5, 7, 23, 12]
// 输出：true
// 解释：存在连续三个元素都是奇数的情况，即[5, 7, 23] 。


// 提示：

// 1 <= arr.length <= 1000
// 1 <= arr[i] <= 1000

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var threeConsecutiveOdds = function (arr) {
  const n = arr.length;
  for (let i = 0; i <= n - 3; ++i) {
    if ((arr[i] & 1) & (arr[i + 1] & 1) & (arr[i + 2] & 1)) {
      return true;
    }
  }
  return false;
};