// 1895. 最大的幻方
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 一个 k x k 的 幻方 指的是一个 k x k 填满整数的方格阵，且每一行、每一列以及两条对角线的和 全部相等 。幻方中的整数 不需要互不相同 。显然，每个 1 x 1 的方格都是一个幻方。

// 给你一个 m x n 的整数矩阵 grid ，请你返回矩阵中 最大幻方 的 尺寸 （即边长 k）。

// 示例 1：
// https://assets.leetcode.com/uploads/2021/05/29/magicsquare-grid.jpg

// 输入：grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
// 输出：3
// 解释：最大幻方尺寸为 3 。
// 每一行，每一列以及两条对角线的和都等于 12 。
// - 每一行的和：5+1+6 = 5+4+3 = 2+7+3 = 12
// - 每一列的和：5+5+2 = 1+4+7 = 6+3+3 = 12
// - 对角线的和：5+4+3 = 6+4+2 = 12
// 示例 2：
// https://assets.leetcode.com/uploads/2021/05/29/magicsquare2-grid.jpg

// 输入：grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
// 输出：2

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 50
// 1 <= grid[i][j] <= 10^6
/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestMagicSquare = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  // 每一行的前缀和
  const rowsum = Array.from({ length: m }, () => new Array(n));
  for (let i = 0; i < m; ++i) {
    rowsum[i][0] = grid[i][0];
    for (let j = 1; j < n; ++j) {
      rowsum[i][j] = rowsum[i][j - 1] + grid[i][j];
    }
  }
  // 每一列的前缀和
  const colsum = Array.from({ length: m }, () => new Array(n));
  for (let j = 0; j < n; ++j) {
    colsum[0][j] = grid[0][j];
    for (let i = 1; i < m; ++i) {
      colsum[i][j] = colsum[i - 1][j] + grid[i][j];
    }
  }

  // 从大到小枚举边长 edge
  for (let edge = Math.min(m, n); edge >= 2; --edge) {
    // 枚举正方形的左上角位置 (i,j)
    for (let i = 0; i + edge <= m; ++i) {
      for (let j = 0; j + edge <= n; ++j) {
        // 计算标准值
        let stdsum = rowsum[i][j + edge - 1] - (j > 0 ? rowsum[i][j - 1] : 0);
        let check = true;
        // 检查每一行
        for (let ii = i + 1; ii < i + edge; ++ii) {
          let sum = rowsum[ii][j + edge - 1] - (j > 0 ? rowsum[ii][j - 1] : 0);
          if (sum !== stdsum) {
            check = false;
            break;
          }
        }
        if (!check) continue;
        // 检查每一列
        for (let jj = j; jj < j + edge; ++jj) {
          let sum = colsum[i + edge - 1][jj] - (i > 0 ? colsum[i - 1][jj] : 0);
          if (sum !== stdsum) {
            check = false;
            break;
          }
        }
        if (!check) continue;
        // 检查对角线
        let d1 = 0,
          d2 = 0;
        for (let k = 0; k < edge; ++k) {
          d1 += grid[i + k][j + k];
          d2 += grid[i + k][j + edge - 1 - k];
        }
        if (d1 === stdsum && d2 === stdsum) {
          return edge;
        }
      }
    }
  }
  return 1;
};
