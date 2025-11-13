// 2536. 子矩阵元素加 1
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个正整数 n ，表示最初有一个 n x n 、下标从 0 开始的整数矩阵 mat ，矩阵中填满了 0 。

// 另给你一个二维整数数组 query 。针对每个查询 query[i] = [row1i, col1i, row2i, col2i] ，请你执行下述操作：

// 找出 左上角 为 (row1i, col1i) 且 右下角 为 (row2i, col2i) 的子矩阵，将子矩阵中的 每个元素 加 1 。也就是给所有满足 row1i <= x <= row2i 和 col1i <= y <= col2i 的 mat[x][y] 加 1 。
// 返回执行完所有操作后得到的矩阵 mat 。

// 示例 1：

// https://assets.leetcode.com/uploads/2022/11/24/p2example11.png

// 输入：n = 3, queries = [[1,1,2,2],[0,0,1,1]]
// 输出：[[1,1,0],[1,2,1],[0,1,1]]
// 解释：上图所展示的分别是：初始矩阵、执行完第一个操作后的矩阵、执行完第二个操作后的矩阵。
// - 第一个操作：将左上角为 (1, 1) 且右下角为 (2, 2) 的子矩阵中的每个元素加 1 。
// - 第二个操作：将左上角为 (0, 0) 且右下角为 (1, 1) 的子矩阵中的每个元素加 1 。
// 示例 2：

// https://assets.leetcode.com/uploads/2022/11/24/p2example22.png

// 输入：n = 2, queries = [[0,0,1,1]]
// 输出：[[1,1],[1,1]]
// 解释：上图所展示的分别是：初始矩阵、执行完第一个操作后的矩阵。
// - 第一个操作：将矩阵中的每个元素加 1 。

// 提示：

// 1 <= n <= 500
// 1 <= queries.length <= 10^4
// 0 <= row1.i <= row2.i < n
// 0 <= col1.i <= col2.i < n
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
  let diff = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  for (let [row1, col1, row2, col2] of queries) {
    diff[row1][col1] += 1;
    diff[row2 + 1][col1] -= 1;
    diff[row1][col2 + 1] -= 1;
    diff[row2 + 1][col2 + 1] += 1;
  }
  let mat = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let x1 = i === 0 ? 0 : mat[i - 1][j];
      let x2 = j === 0 ? 0 : mat[i][j - 1];
      let x3 = i === 0 || j === 0 ? 0 : mat[i - 1][j - 1];
      mat[i][j] = diff[i][j] + x1 + x2 - x3;
    }
  }
  return mat;
};

var rangeAddQueries1 = function (n, queries) {
  const map = new Array(n).fill().map(() => new Array(n).fill(0));
  while (queries.length) {
    const next = queries.shift();
    for (let i = next[0]; i <= next[2]; i++) {
      for (let j = next[1]; j <= next[3]; j++) {
        map[i][j]++;
      }
    }
  }
  return map;
};

const n = 3,
  queries = [
    [1, 1, 2, 2],
    [0, 0, 1, 1],
  ];
console.log(rangeAddQueries(n, queries));
