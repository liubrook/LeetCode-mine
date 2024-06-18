// 2713. 矩阵中严格递增的单元格数
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个下标从 1 开始、大小为 m x n 的整数矩阵 mat，你可以选择任一单元格作为 起始单元格 。

// 从起始单元格出发，你可以移动到 同一行或同一列 中的任何其他单元格，但前提是目标单元格的值 严格大于 当前单元格的值。

// 你可以多次重复这一过程，从一个单元格移动到另一个单元格，直到无法再进行任何移动。

// 请你找出从某个单元开始访问矩阵所能访问的 单元格的最大数量 。

// 返回一个表示可访问单元格最大数量的整数。



// 示例 1：

// https://assets.leetcode.com/uploads/2023/04/23/diag1drawio.png

// 输入：mat = [[3, 1], [3, 4]]
// 输出：2
// 解释：上图展示了从第 1 行、第 2 列的单元格开始，可以访问 2 个单元格。可以证明，无论从哪个单元格开始，最多只能访问 2 个单元格，因此答案是 2 。 
// 示例 2：

// https://assets.leetcode.com/uploads/2023/04/23/diag3drawio.png

// 输入：mat = [[1, 1], [1, 1]]
// 输出：1
// 解释：由于目标单元格必须严格大于当前单元格，在本示例中只能访问 1 个单元格。 
// 示例 3：

// https://assets.leetcode.com/uploads/2023/04/23/diag4drawio.png

// 输入：mat = [[3, 1, 6], [-9, 5, 7]]
// 输出：4
// 解释：上图展示了从第 2 行、第 1 列的单元格开始，可以访问 4 个单元格。可以证明，无论从哪个单元格开始，最多只能访问 4 个单元格，因此答案是 4 。


// 提示：

// m == mat.length
// n == mat[i].length
// 1 <= m, n <= 10^5
// 1 <= m * n <= 10^5
//   - 10^5 <= mat[i][j] <= 10^5

/**
 * @param {number[][]} mat
 * @return {number}
 */
var maxIncreasingCells = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const mp = new Map();
  const row = new Array(m).fill(0);
  const col = new Array(n).fill(0);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!mp.has(mat[i][j])) {
        mp.set(mat[i][j], []);
      }
      mp.get(mat[i][j]).push([i, j]);
    }
  }
  const sortedMap = new Map([...mp.entries()].sort((a, b) => a[0] - b[0]));
  for (const [_, pos] of sortedMap) {
    const res = pos.map(([i, j]) => Math.max(row[i], col[j]) + 1); // 存放相同数值的答案，便于后续更新 row 和 col
    for (let k = 0; k < pos.length; k++) {
      const [i, j] = pos[k];
      const d = res[k];
      row[i] = Math.max(row[i], d);
      col[j] = Math.max(col[j], d);
    }
  }
  return Math.max(...row);
};