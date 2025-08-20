// 1504. 统计全 1 子矩形
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 m x n 的二进制矩阵 mat ，请你返回有多少个 子矩形 的元素全部都是 1 。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/10/27/ones1-grid.jpg

// 输入：mat = [[1, 0, 1], [1, 1, 0], [1, 1, 0]]
// 输出：13
// 解释：
// 有 6 个 1x1 的矩形。
// 有 2 个 1x2 的矩形。
// 有 3 个 2x1 的矩形。
// 有 1 个 2x2 的矩形。
// 有 1 个 3x1 的矩形。
// 矩形数目总共 = 6 + 2 + 3 + 1 + 1 = 13 。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/10/27/ones2-grid.jpg

// 输入：mat = [[0, 1, 1, 0], [0, 1, 1, 1], [1, 1, 1, 0]]
// 输出：24
// 解释：
// 有 8 个 1x1 的子矩形。
// 有 5 个 1x2 的子矩形。
// 有 2 个 1x3 的子矩形。
// 有 4 个 2x1 的子矩形。
// 有 2 个 2x2 的子矩形。
// 有 2 个 3x1 的子矩形。
// 有 1 个 3x2 的子矩形。
// 矩形数目总共 = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24 。



// 提示：

// 1 <= m, n <= 150
// mat[i][j] 仅包含 0 或 1

/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSubmat = function (mat) {
  const n = mat[0].length;
  const heights = new Array(n).fill(0);
  let res = 0;
  for (const row of mat) {
    for (let i = 0; i < n; i++) {
      heights[i] = row[i] === 0 ? 0 : heights[i] + 1;
    }
    const stack = [[-1, 0, -1]];
    for (let i = 0; i < n; i++) {
      const h = heights[i];
      while (stack[stack.length - 1][2] >= h) {
        stack.pop();
      }
      const [j, prev] = stack[stack.length - 1];
      const cur = prev + (i - j) * h;
      stack.push([i, cur, h]);
      res += cur;
    }
  }
  return res;
};