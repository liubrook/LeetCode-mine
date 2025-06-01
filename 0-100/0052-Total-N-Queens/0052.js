// 52. N 皇后 II
// 困难
// 相关标签
// 相关企业
// n 皇后问题 研究的是如何将 n 个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。

// 给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/11/13/queens.jpg
// 输入：n = 4
// 输出：2
// 解释：如上图所示，4 皇后问题存在两个不同的解法。
// 示例 2：

// 输入：n = 1
// 输出：1


// 提示：

// 1 <= n <= 9

/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  const columns = new Set();
  const diagonals1 = new Set();
  const diagonals2 = new Set();
  return backtrack(n, 0, columns, diagonals1, diagonals2);
};

const backtrack = (n, row, columns, diagonals1, diagonals2) => {
  if (row === n) {
    return 1;
  } else {
    let count = 0;
    for (let i = 0; i < n; i++) {
      if (columns.has(i)) {
        continue;
      }
      const diagonal1 = row - i;
      if (diagonals1.has(diagonal1)) {
        continue;
      }
      const diagonal2 = row + i;
      if (diagonals2.has(diagonal2)) {
        continue;
      }
      columns.add(i);
      diagonals1.add(diagonal1);
      diagonals2.add(diagonal2);
      count += backtrack(n, row + 1, columns, diagonals1, diagonals2);
      columns.delete(i);
      diagonals1.delete(diagonal1);
      diagonals2.delete(diagonal2);
    }
    return count;
  }
}
