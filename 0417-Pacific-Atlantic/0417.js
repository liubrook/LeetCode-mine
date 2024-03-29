// 417. 太平洋大西洋水流问题
// 有一个 m × n 的矩形岛屿，与 太平洋 和 大西洋 相邻。 “太平洋” 处于大陆的左边界和上边界，而 “大西洋” 处于大陆的右边界和下边界。

// 这个岛被分割成一个由若干方形单元格组成的网格。给定一个 m x n 的整数矩阵 heights ， heights[r][c] 表示坐标(r, c) 上单元格 高于海平面的高度 。

// 岛上雨水较多，如果相邻单元格的高度 小于或等于 当前单元格的高度，雨水可以直接向北、南、东、西流向相邻单元格。水可以从海洋附近的任何单元格流入海洋。

// 返回 网格坐标 result 的 2D列表 ，其中 result[i] = [ri, ci] 表示雨水可以从单元格(ri, ci) 流向 太平洋和大西洋 。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/06/08/waterflow-grid.jpg

// 输入: heights = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]
// 输出: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
// 示例 2：

// 输入: heights = [[2, 1], [1, 2]]
// 输出: [[0, 0], [0, 1], [1, 0], [1, 1]]


// 提示：

// m == heights.length
// n == heights[r].length
// 1 <= m, n <= 200
// 0 <= heights[r][c] <= 105


/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
var pacificAtlantic = function (heights) {
  m = heights.length;
  n = heights[0].length;
  const pacific = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const atlantic = new Array(m).fill(0).map(() => new Array(n).fill(0));

  const bfs = (row, col, ocean) => {
    if (ocean[row][col]) {
      return;
    }
    ocean[row][col] = true;
    const queue = [];
    queue.push([row, col]);
    while (queue.length) {
      const cell = queue.shift();
      for (const dir of dirs) {
        const newRow = cell[0] + dir[0], newCol = cell[1] + dir[1];
        if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && heights[newRow][newCol] >= heights[cell[0]][cell[1]] && !ocean[newRow][newCol]) {
          ocean[newRow][newCol] = true;
          queue.push([newRow, newCol]);
        }
      }
    }
  };

  for (let i = 0; i < m; i++) {
    bfs(i, 0, pacific);
  }
  for (let j = 1; j < n; j++) {
    bfs(0, j, pacific);
  }
  for (let i = 0; i < m; i++) {
    bfs(i, n - 1, atlantic);
  }
  for (let j = 0; j < n - 1; j++) {
    bfs(m - 1, j, atlantic);
  }
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        const cell = [];
        cell.push(i);
        cell.push(j);
        result.push(cell);
      }
    }
  }
  return result;
}