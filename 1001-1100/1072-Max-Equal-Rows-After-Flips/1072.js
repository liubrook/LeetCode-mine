// 1072. 按列翻转得到最大值等行数
// 给定 m x n 矩阵 matrix 。

// 你可以从中选出任意数量的列并翻转其上的 每个 单元格。（即翻转后，单元格的值从 0 变成 1，或者从 1 变为 0 。）

// 返回 经过一些翻转后，行与行之间所有值都相等的最大行数 。



// 示例 1：

// 输入：matrix = [[0, 1], [1, 1]]
// 输出：1
// 解释：不进行翻转，有 1 行所有值都相等。
// 示例 2：

// 输入：matrix = [[0, 1], [1, 0]]
// 输出：2
// 解释：翻转第一列的值之后，这两行都由相等的值组成。
// 示例 3：

// 输入：matrix = [[0, 0, 0], [0, 0, 1], [1, 1, 0]]
// 输出：2
// 解释：翻转前两列的值之后，后两行由相等的值组成。


// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 300
// matrix[i][j] == 0 或 1


/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxEqualRowsAfterFlips = function (matrix) {
  let m = matrix.length, n = matrix[0].length;
  let map = {};
  for (let i = 0; i < m; i++) {
    let arr = new Array(n).fill('0');
    for (let j = 0; j < n; j++) {
      // 如果 matrix[i][0] 为 1，则对该行元素进行翻转
      arr[j] = '0' + (matrix[i][j] ^ matrix[i][0]);
    }
    let s = arr.join('');
    map[s] = (map[s] || 0) + 1;
  }
  let res = 0;
  for (let key in map) {
    res = Math.max(res, map[key]);
  }
  return res;
};