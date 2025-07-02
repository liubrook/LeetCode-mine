// 3128. 直角三角形
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个二维 boolean 矩阵 grid 。

// 请你返回使用 grid 中的 3 个元素可以构建的 直角三角形 数目，且满足 3 个元素值 都 为 1 。

// 注意：

// 如果 grid 中 3 个元素满足：一个元素与另一个元素在 同一行，同时与第三个元素在 同一列 ，那么这 3 个元素称为一个 直角三角形 。这 3 个元素互相之间不需要相邻。


// 示例 1：

// 0	1	0
// 0	1	1
// 0	1	0
// 0	1	0
// 0	1	1
// 0	1	0
// 输入：grid = [[0, 1, 0], [0, 1, 1], [0, 1, 0]]

// 输出：2

// 解释：

// 有 2 个直角三角形。

// 示例 2：

// 1	0	0	0
// 0	1	0	1
// 1	0	0	0
// 输入：grid = [[1, 0, 0, 0], [0, 1, 0, 1], [1, 0, 0, 0]]

// 输出：0

// 解释：

// 没有直角三角形。

// 示例 3：

// 1	0	1
// 1	0	0
// 1	0	0
// 1	0	1
// 1	0	0
// 1	0	0
// 输入：grid = [[1, 0, 1], [1, 0, 0], [1, 0, 0]]

// 输出：2

// 解释：

// 有两个直角三角形。



// 提示：

// 1 <= grid.length <= 1000
// 1 <= grid[i].length <= 1000
// 0 <= grid[i][j] <= 1

/**
 * @param {number[][]} grid
 * @return {number}
 */
var numberOfRightTriangles = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  const col = Array(m).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      col[j] += grid[i][j];
    }
  }

  let res = 0;
  for (let i = 0; i < n; i++) {
    let row = grid[i].reduce((a, b) => a + b, 0);
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        res += (row - 1) * (col[j] - 1);
      }
    }
  }

  return res;
};