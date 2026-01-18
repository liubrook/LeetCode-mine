// 1292. 元素和小于等于阈值的正方形的最大边长
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个大小为 m x n 的矩阵 mat 和一个整数阈值 threshold。

// 请你返回元素总和小于或等于阈值的正方形区域的最大边长；如果没有这样的正方形区域，则返回 0 。

// 示例 1：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2019/12/15/e1.png

// 输入：mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
// 输出：2
// 解释：总和小于或等于 4 的正方形的最大边长为 2，如图所示。
// 示例 2：

// 输入：mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
// 输出：0

// 提示：

// m == mat.length
// n == mat[i].length
// 1 <= m, n <= 300
// 0 <= mat[i][j] <= 10^4
// 0 <= threshold <= 10^5
/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */
var maxSideLength = function (mat, threshold) {
  const m = mat.length,
    n = mat[0].length;
  const P = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      P[i][j] = P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1] + mat[i - 1][j - 1];
    }
  }

  const getRect = (x1, y1, x2, y2) => {
    return P[x2][y2] - P[x1 - 1][y2] - P[x2][y1 - 1] + P[x1 - 1][y1 - 1];
  };

  const r = Math.min(m, n);
  let ans = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      for (let c = ans + 1; c <= r; c++) {
        if (
          i + c - 1 <= m &&
          j + c - 1 <= n &&
          getRect(i, j, i + c - 1, j + c - 1) <= threshold
        ) {
          ans = c;
        } else {
          break;
        }
      }
    }
  }
  return ans;
};
