// 2275. 按位与结果大于零的最长组合
// 中等
// 相关标签
// 相关企业
// 提示
// 对数组 nums 执行 按位与 相当于对数组 nums 中的所有整数执行 按位与 。

// 例如，对 nums = [1, 5, 3] 来说，按位与等于 1 & 5 & 3 = 1 。
// 同样，对 nums = [7] 而言，按位与等于 7 。
// 给你一个正整数数组 candidates 。计算 candidates 中的数字每种组合下 按位与 的结果。

// 返回按位与结果大于 0 的 最长 组合的长度。



// 示例 1：

// 输入：candidates = [16, 17, 71, 62, 12, 24, 14]
// 输出：4
// 解释：组合[16, 17, 62, 24] 的按位与结果是 16 & 17 & 62 & 24 = 16 > 0 。
// 组合长度是 4 。
// 可以证明不存在按位与结果大于 0 且长度大于 4 的组合。
// 注意，符合长度最大的组合可能不止一种。
// 例如，组合[62, 12, 24, 14] 的按位与结果是 62 & 12 & 24 & 14 = 8 > 0 。
// 示例 2：

// 输入：candidates = [8, 8]
// 输出：2
// 解释：最长组合是[8, 8] ，按位与结果 8 & 8 = 8 > 0 。
// 组合长度是 2 ，所以返回 2 。


// 提示：

// 1 <= candidates.length <= 10^5
// 1 <= candidates[i] <= 10^7

/**
 * @param {number[]} candidates
 * @return {number}
 */
var largestCombination = function (candidates) {
  // 计算从低到高第 k 个二进制位数值为 1 的元素个数
  const maxlen = (k) => {
    let res = 0;
    for (let num of candidates) {
      if (num & (1 << k)) {
        res++;
      }
    }
    return res;
  };

  let res = 0;
  for (let i = 0; i < 24; i++) {
    // 遍历二进制位
    res = Math.max(res, maxlen(i));
  }
  return res;
};