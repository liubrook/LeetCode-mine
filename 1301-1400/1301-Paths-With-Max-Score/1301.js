// 1301. 最大得分的路径数目
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个正方形字符数组 board ，你从数组最右下方的字符 'S' 出发。

// 你的目标是到达数组最左上角的字符 'E' ，数组剩余的部分为数字字符 1, 2, ..., 9 或者障碍 'X'。在每一步移动中，你可以向上、向左或者左上方移动，可以移动的前提是到达的格子没有障碍。

// 一条路径的 「得分」 定义为：路径上所有数字的和。

// 请你返回一个列表，包含两个整数：第一个整数是 「得分」 的最大值，第二个整数是得到最大得分的方案数，请把结果对 10^9 + 7 取余。

// 如果没有任何路径可以到达终点，请返回 [0, 0] 。

// 示例 1：

// 输入：board = ["E23","2X2","12S"]
// 输出：[7,1]
// 示例 2：

// 输入：board = ["E12","1X1","21S"]
// 输出：[4,2]
// 示例 3：

// 输入：board = ["E11","XXX","11S"]
// 输出：[0,0]

// 提示：

// 2 <= board.length == board[i].length <= 100
/**
 * @param {string[]} board
 * @return {number[]}
 */
var pathsWithMaxScore = function (board) {
  const MOD = 1000000007;
  const n = board.length;
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => [-1, 0]),
  );
  dp[n - 1][n - 1][0] = 0;
  dp[n - 1][n - 1][1] = 1;

  const update = (x, y, u, v) => {
    if (u >= n || v >= n || dp[u][v][0] === -1) {
      return;
    }
    if (dp[u][v][0] > dp[x][y][0]) {
      dp[x][y][0] = dp[u][v][0];
      dp[x][y][1] = dp[u][v][1];
    } else if (dp[u][v][0] === dp[x][y][0]) {
      dp[x][y][1] = (dp[x][y][1] + dp[u][v][1]) % MOD;
    }
  };

  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (!(i === n - 1 && j === n - 1) && board[i][j] !== "X") {
        update(i, j, i + 1, j);
        update(i, j, i, j + 1);
        update(i, j, i + 1, j + 1);
        if (dp[i][j][0] !== -1) {
          dp[i][j][0] += board[i][j] === "E" ? 0 : parseInt(board[i][j]);
        }
      }
    }
  }
  if (dp[0][0][0] !== -1) {
    return [dp[0][0][0], dp[0][0][1] % MOD];
  }
  return [0, 0];
};
