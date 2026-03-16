// 1878. 矩阵中最大的三个菱形和
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 m x n 的整数矩阵 grid 。

// 菱形和 指的是 grid 中一个正菱形 边界 上的元素之和。本题中的菱形必须为正方形旋转45度，且四个角都在一个格子当中。下图是四个可行的菱形，每个菱形和应该包含的格子都用了相应颜色标注在图中。

// https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-desc-2.png

// 注意，菱形可以是一个面积为 0 的区域，如上图中右下角的紫色菱形所示。

// 请你按照 降序 返回 grid 中三个最大的 互不相同的菱形和 。如果不同的和少于三个，则将它们全部返回。

// 示例 1：
// https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-ex1.png

// 输入：grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
// 输出：[228,216,211]
// 解释：最大的三个菱形和如上图所示。
// - 蓝色：20 + 3 + 200 + 5 = 228
// - 红色：200 + 2 + 10 + 4 = 216
// - 绿色：5 + 200 + 4 + 2 = 211
// 示例 2：
// https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-ex2.png

// 输入：grid = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[20,9,8]
// 解释：最大的三个菱形和如上图所示。
// - 蓝色：4 + 2 + 6 + 8 = 20
// - 红色：9 （右下角红色的面积为 0 的菱形）
// - 绿色：8 （下方中央面积为 0 的菱形）
// 示例 3：

// 输入：grid = [[7,7,7]]
// 输出：[7]
// 解释：所有三个可能的菱形和都相同，所以返回 [7] 。

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 100
// 1 <= grid[i][j] <= 10^5
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var getBiggestThree = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  const sum1 = Array.from({ length: m + 1 }, () => new Array(n + 2).fill(0));
  const sum2 = Array.from({ length: m + 1 }, () => new Array(n + 2).fill(0));

  for (let i = 1; i <= m; ++i) {
    for (let j = 1; j <= n; ++j) {
      sum1[i][j] = sum1[i - 1][j - 1] + grid[i - 1][j - 1];
      sum2[i][j] = sum2[i - 1][j + 1] + grid[i - 1][j - 1];
    }
  }

  const ans = new Answer();
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      // 单独的一个格子也是菱形
      ans.put(grid[i][j]);
      for (let k = i + 2; k < m; k += 2) {
        const ux = i,
          uy = j;
        const dx = k,
          dy = j;
        const lx = Math.floor((i + k) / 2),
          ly = j - Math.floor((k - i) / 2);
        const rx = Math.floor((i + k) / 2),
          ry = j + Math.floor((k - i) / 2);
        if (ly < 0 || ry >= n) {
          break;
        }
        const sum =
          sum2[lx + 1][ly + 1] -
          sum2[ux][uy + 2] +
          (sum1[rx + 1][ry + 1] - sum1[ux][uy]) +
          (sum1[dx + 1][dy + 1] - sum1[lx][ly]) +
          (sum2[dx + 1][dy + 1] - sum2[rx][ry + 2]) -
          (grid[ux][uy] + grid[dx][dy] + grid[lx][ly] + grid[rx][ry]);
        ans.put(sum);
      }
    }
  }

  return ans.get();
};
class Answer {
  constructor() {
    this.ans = [0, 0, 0];
  }
  put(x) {
    if (x > this.ans[0]) {
      this.ans[2] = this.ans[1];
      this.ans[1] = this.ans[0];
      this.ans[0] = x;
    } else if (x !== this.ans[0] && x > this.ans[1]) {
      this.ans[2] = this.ans[1];
      this.ans[1] = x;
    } else if (x !== this.ans[0] && x !== this.ans[1] && x > this.ans[2]) {
      this.ans[2] = x;
    }
  }
  get() {
    const ret = [];
    for (const num of this.ans) {
      if (num !== 0) {
        ret.push(num);
      }
    }
    return ret;
  }
}
