// 1349. 参加考试的最大学生数
// 提示
// 困难
// 165
// 相关企业
// 给你一个 m * n 的矩阵 seats 表示教室中的座位分布。如果座位是坏的（不可用），就用 '#' 表示；否则，用 '.' 表示。

// 学生可以看到左侧、右侧、左上、右上这四个方向上紧邻他的学生的答卷，但是看不到直接坐在他前面或者后面的学生的答卷。请你计算并返回该考场可以容纳的同时参加考试且无法作弊的 最大 学生人数。

// 学生必须坐在状况良好的座位上。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/09/image.png

// 输入：seats = [["#", ".", "#", "#", ".", "#"],
// [".", "#", "#", "#", "#", "."],
// ["#", ".", "#", "#", ".", "#"]]
// 输出：4
// 解释：教师可以让 4 个学生坐在可用的座位上，这样他们就无法在考试中作弊。 
// 示例 2：

// 输入：seats = [[".", "#"],
// ["#", "#"],
// ["#", "."],
// ["#", "#"],
// [".", "#"]]
// 输出：3
// 解释：让所有学生坐在可用的座位上。
// 示例 3：

// 输入：seats = [["#", ".", ".", ".", "#"],
// [".", "#", ".", "#", "."],
// [".", ".", "#", ".", "."],
// [".", "#", ".", "#", "."],
// ["#", ".", ".", ".", "#"]]
// 输出：10
// 解释：让学生坐在第 1、3 和 5 列的可用座位上。


// 提示：

// seats 只包含字符 '.' 和'#'
// m == seats.length
// n == seats[i].length
// 1 <= m <= 8
// 1 <= n <= 8

/**
 * @param {character[][]} seats
 * @return {number}
 */
var maxStudents = function (seats) {
  const m = seats.length, n = seats[0].length;
  const memo = new Map();

  const isSingleRowCompliant = function (status, row) {
    for (let j = 0; j < n; j++) {
      if ((status >> j) & 1) {
        if (seats[row][j] == '#') {
          return false;
        }
        if (j > 0 && ((status >> (j - 1)) & 1)) {
          return false;
        }
      }
    }
    return true;
  };

  const isCrossRowsCompliant = function (status, upperRowStatus) {
    for (let j = 0; j < n; j++) {
      if ((status >> j) & 1) {
        if (j > 0 && ((upperRowStatus >> (j - 1)) & 1)) {
          return false;
        }
        if (j < n - 1 && ((upperRowStatus >> (j + 1)) & 1)) {
          return false;
        }
      }
    }
    return true;
  };

  const dp = function (row, status) {
    const key = (row << n) + status;
    if (!memo.has(key)) {
      if (!isSingleRowCompliant(status, row)) {
        memo.set(key, -Infinity);
        return -Infinity;
      }
      let students = bitCount(status);
      if (row == 0) {
        memo.set(key, students);
        return students;
      }
      let mx = 0;
      for (let upperRowStatus = 0; upperRowStatus < 1 << n; upperRowStatus++) {
        if (isCrossRowsCompliant(status, upperRowStatus)) {
          mx = Math.max(mx, dp(row - 1, upperRowStatus));
        }
      }
      memo.set(key, students + mx);
    }
    return memo.get(key);
  };

  let mx = 0;
  for (let i = 0; i < (1 << n); i++) {
    mx = Math.max(mx, dp(m - 1, i));
  }
  return mx;
};

var bitCount = function (num) {
  let bits = num;
  bits = bits - ((bits >> 1) & 0x55555555);
  bits = (bits & 0x33333333) + ((bits >> 2) & 0x33333333);
  bits = (bits + (bits >> 4)) & 0x0f0f0f0f;
  bits = (bits + (bits >> 8)) & 0x00ff00ff;
  bits = (bits + (bits >> 16)) & 0x0000ffff;
  return bits;
}