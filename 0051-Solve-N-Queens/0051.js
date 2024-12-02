// 51. N 皇后
// 困难
// 相关标签
// 相关企业
// 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/11/13/queens.jpg
// 输入：n = 4
// 输出：[[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]
// 解释：如上图所示，4 皇后问题存在两个不同的解法。
// 示例 2：

// 输入：n = 1
// 输出：[["Q"]]


// 提示：

// 1 <= n <= 9

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const solutions = [];
  const queens = new Array(n).fill(-1);
  const columns = new Set();
  const diagonal1 = new Set();
  const diagonal2 = new Set();
  const row = new Array(n).fill(".");

  function generateBoard() {
    const board = [];
    for (let i = 0; i < n; i++) {
      row[queens[i]] = "Q";
      board.push(row.join(""));
      row[queens[i]] = ".";
    }
    return board;
  }

  function backtrack(row) {
    if (row === n) {
      const board = generateBoard();
      solutions.push(board);
    } else {
      for (let i = 0; i < n; i++) {
        if (columns.has(i) || diagonal1.has(row - i) || diagonal2.has(row + i)) {
          continue;
        }
        queens[row] = i;
        columns.add(i);
        diagonal1.add(row - i);
        diagonal2.add(row + i);
        backtrack(row + 1);
        columns.delete(i);
        diagonal1.delete(row - i);
        diagonal2.delete(row + i);
      }
    }
  }

  backtrack(0);
  return solutions;
};