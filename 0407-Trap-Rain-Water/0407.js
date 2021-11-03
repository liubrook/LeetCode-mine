// 407. 接雨水 II
// 给你一个 m x n 的矩阵，其中的值均为非负整数，代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。



// 示例 1:

// https://assets.leetcode.com/uploads/2021/04/08/trap1-3d.jpg

// 输入: heightMap = [[1, 4, 3, 1, 3, 2], [3, 2, 1, 3, 2, 4], [2, 3, 3, 2, 3, 1]]
// 输出: 4
// 解释: 下雨后，雨水将会被上图蓝色的方块中。总的接雨水量为1 + 2 + 1=4。
// 示例 2:

// https://assets.leetcode.com/uploads/2021/04/08/trap2-3d.jpg

// 输入: heightMap = [[3, 3, 3, 3, 3], [3, 2, 2, 2, 3], [3, 2, 1, 2, 3], [3, 2, 2, 2, 3], [3, 3, 3, 3, 3]]
// 输出: 10


// 提示:

// m == heightMap.length
// n == heightMap[i].length
// 1 <= m, n <= 200
// 0 <= heightMap[i][j] <= 2 * 104


/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function (heightMap) {
  const m = heightMap.length;
  const n = heightMap[0].length;
  const dirs = [-1, 0, 1, 0, -1];
  let maxHeight = 0;

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      maxHeight = Math.max(maxHeight, heightMap[i][j]);
    }
  }
  const water = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      water[i][j] = maxHeight;
    }
  }
  const qu = [];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
        if (water[i][j] > heightMap[i][j]) {
          water[i][j] = heightMap[i][j];
          qu.push([i, j]);
        }
      }
    }
  }
  while (qu.length) {
    const curr = qu.shift();
    const x = curr[0];
    const y = curr[1];
    for (let i = 0; i < 4; ++i) {
      const nx = x + dirs[i], ny = y + dirs[i + 1];
      if (nx < 0 || nx >= m || ny < 0 || ny >= n) {
        continue;
      }
      if (water[x][y] < water[nx][ny] && water[nx][ny] > heightMap[nx][ny]) {
        water[nx][ny] = Math.max(water[x][y], heightMap[nx][ny]);
        qu.push([nx, ny]);
      }
    }
  }

  let res = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      res += water[i][j] - heightMap[i][j];
    }
  }
  return res;
}