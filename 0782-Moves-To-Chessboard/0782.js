// 782. 变为棋盘
// 一个 n x n 的二维网络 board 仅由 0 和 1 组成 。每次移动，你能任意交换两列或是两行的位置。

// 返回 将这个矩阵变为  “棋盘”  所需的最小移动次数 。如果不存在可行的变换，输出 - 1。

// “棋盘” 是指任意一格的上下左右四个方向的值均与本身不同的矩阵。



// 示例 1:

// https://assets.leetcode.com/uploads/2021/06/29/chessboard1-grid.jpg

// 输入: board = [[0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1]]
// 输出: 2
// 解释: 一种可行的变换方式如下，从左到右：
// 第一次移动交换了第一列和第二列。
// 第二次移动交换了第二行和第三行。
// 示例 2:

// https://assets.leetcode.com/uploads/2021/06/29/chessboard2-grid.jpg

// 输入: board = [[0, 1], [1, 0]]
// 输出: 0
// 解释: 注意左上角的格值为0时也是合法的棋盘，也是合法的棋盘.
//   示例 3:

// https://assets.leetcode.com/uploads/2021/06/29/chessboard3-grid.jpg

// 输入: board = [[1, 0], [1, 0]]
// 输出: -1
// 解释: 任意的变换都不能使这个输入变为合法的棋盘。


// 提示：

// n == board.length
// n == board[i].length
// 2 <= n <= 30
// board[i][j] 将只包含 0或 1

/**
 * @param {number[][]} board
 * @return {number}
 */
var movesToChessboard = function (board) {
  const n = board.length;
  let rowMask = 0, colMask = 0;

  /* 检查棋盘的第一行与第一列 */
  for (let i = 0; i < n; i++) {
    rowMask |= (board[0][i] << i);
    colMask |= (board[i][0] << i);
  }
  const reverseRowMask = ((1 << n) - 1) ^ rowMask;
  const reverseColMask = ((1 << n) - 1) ^ colMask;
  let rowCnt = 0, colCnt = 0;
  for (let i = 0; i < n; i++) {
    let currRowMask = 0;
    let currColMask = 0;
    for (let j = 0; j < n; j++) {
      currRowMask |= (board[i][j] << j);
      currColMask |= (board[j][i] << j);
    }
    /* 检测每一行的状态是否合法 */
    if (currRowMask !== rowMask && currRowMask !== reverseRowMask) {
      return -1;
    } else if (currRowMask === rowMask) {
      /* 记录与第一行相同的行数 */
      rowCnt++;
    }
    /* 检测每一列的状态是否合法 */
    if (currColMask !== colMask && currColMask !== reverseColMask) {
      return -1;
    } else if (currColMask === colMask) {
      /* 记录与第一列相同的列数 */
      colCnt++;
    }
  }
  const rowMoves = getMoves(rowMask, rowCnt, n);
  const colMoves = getMoves(colMask, colCnt, n);
  return (rowMoves == -1 || colMoves == -1) ? -1 : (rowMoves + colMoves);
};

const getMoves = (mask, count, n) => {
  const ones = bitCount(mask);
  if ((n & 1) === 1) {
    /* 如果 n 为奇数，则每一行中 1 与 0 的数目相差为 1，且满足相邻行交替 */
    if (Math.abs(n - 2 * ones) !== 1 || Math.abs(n - 2 * count) !== 1) {
      return -1;
    }
    if (ones === (n >> 1)) {
      /* 以 0 为开头的最小交换次数 */
      return Math.floor(n / 2) - bitCount(mask & 0xAAAAAAAA);
    } else {
      return Math.floor((n + 1) / 2) - bitCount(mask & 0x55555555);
    }
  } else {
    /* 如果 n 为偶数，则每一行中 1 与 0 的数目相等，且满足相邻行交替 */
    if (ones !== (n >> 1) || count !== (n >> 1)) {
      return -1;
    }
    /* 找到行的最小交换次数 */
    const count0 = Math.floor(n / 2) - bitCount(mask & 0xAAAAAAAA);
    const count1 = Math.floor(n / 2) - bitCount(mask & 0x55555555);
    return Math.min(count0, count1);
  }
}

const bitCount = (num) => {
  return num.toString(2).split('0').join('').length
}