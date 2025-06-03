// 624. 数组列表中的最大距离
// 中等
// 相关标签
// 相关企业
// 给定 m 个数组，每个数组都已经按照升序排好序了。

// 现在你需要从两个不同的数组中选择两个整数（每个数组选一个）并且计算它们的距离。两个整数 a 和 b 之间的距离定义为它们差的绝对值 | a - b | 。

// 返回最大距离。

// 示例 1：

// 输入：[[1, 2, 3], [4, 5], [1, 2, 3]]
// 输出：4
// 解释：
// 一种得到答案 4 的方法是从第一个数组或者第三个数组中选择 1，同时从第二个数组中选择 5 。
// 示例 2：

// 输入：arrays = [[1], [1]]
// 输出：0


// 提示：

// m == arrays.length
// 2 <= m <= 10^5
// 1 <= arrays[i].length <= 500
//   - 10^4 <= arrays[i][j] <= 10^4
// arrays[i] 以 升序 排序。
// 所有数组中最多有 105 个整数。


/**
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function (arrays) {
  let res = 0;
  let n = arrays[0].length;
  let minVal = arrays[0][0];
  let maxVal = arrays[0][n - 1];
  for (let i = 1; i < arrays.length; i++) {
    n = arrays[i].length;
    res = Math.max(res, Math.max(Math.abs(arrays[i][n - 1] - minVal),
      Math.abs(maxVal - arrays[i][0])));
    minVal = Math.min(minVal, arrays[i][0]);
    maxVal = Math.max(maxVal, arrays[i][n - 1]);
  }
  return res;
};