// 840. 矩阵中的幻方
// 中等
// 相关标签
// conpanies icon
// 相关企业
// 3 x 3 的幻方是一个填充有 从 1 到 9  的不同数字的 3 x 3 矩阵，其中每行，每列以及两条对角线上的各数之和都相等。

// 给定一个由整数组成的row x col 的 grid，其中有多少个 3 × 3 的 “幻方” 子矩阵？

// 注意：虽然幻方只能包含 1 到 9 的数字，但 grid 可以包含最多15的数字。

// 示例 1：

// https://assets.leetcode.com/uploads/2020/09/11/magic_main.jpg

// 输入: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]
// 输出: 1
// 解释:
// 下面的子矩阵是一个 3 x 3 的幻方：
// https://assets.leetcode.com/uploads/2020/09/11/magic_valid.jpg
// 而这一个不是：
// https://assets.leetcode.com/uploads/2020/09/11/magic_invalid.jpg
// 总的来说，在本示例所给定的矩阵中只有一个 3 x 3 的幻方子矩阵。
// 示例 2:

// 输入: grid = [[8]]
// 输出: 0

// 提示:

// row == grid.length
// col == grid[i].length
// 1 <= row, col <= 10
// 0 <= grid[i][j] <= 15
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numMagicSquaresInside = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let r = 0; r < rows - 2; r++) {
    for (let c = 0; c < cols - 2; c++) {
      if (grid[r + 1][c + 1] !== 5) {
        continue;
      }
      if (
        isMagicSquare(
          grid[r][c],
          grid[r][c + 1],
          grid[r][c + 2],
          grid[r + 1][c],
          grid[r + 1][c + 1],
          grid[r + 1][c + 2],
          grid[r + 2][c],
          grid[r + 2][c + 1],
          grid[r + 2][c + 2]
        )
      ) {
        count++;
      }
    }
  }

  return count;
};

function isMagicSquare(...vals) {
  const frequency = new Array(16).fill(0);
  for (const value of vals) {
    if (value < 1 || value > 9) {
      return false;
    }
    frequency[value]++;
  }
  for (let num = 1; num <= 9; num++) {
    if (frequency[num] !== 1) {
      return false;
    }
  }

  return (
    vals[0] + vals[1] + vals[2] === 15 && // 第一行
    vals[3] + vals[4] + vals[5] === 15 && // 第二行
    vals[6] + vals[7] + vals[8] === 15 && // 第三行
    vals[0] + vals[3] + vals[6] === 15 && // 第一列
    vals[1] + vals[4] + vals[7] === 15 && // 第二列
    vals[2] + vals[5] + vals[8] === 15 && // 第三列
    vals[0] + vals[4] + vals[8] === 15 && // 主对角线
    vals[2] + vals[4] + vals[6] === 15
  ); // 副对角线
}
