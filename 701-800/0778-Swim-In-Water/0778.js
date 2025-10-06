// 778. 水位上升的泳池中游泳
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 在一个 n x n 的整数矩阵 grid 中，每一个方格的值 grid[i][j] 表示位置(i, j) 的平台高度。

// 当开始下雨时，在时间为 t 时，水池中的水位为 t 。你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。

// 你从坐标方格的左上平台(0，0) 出发。返回 你到达坐标方格的右下平台(n - 1, n - 1) 所需的最少时间 。



// 示例 1:

// https://assets.leetcode.com/uploads/2021/06/29/swim1-grid.jpg

// 输入: grid = [[0, 2], [1, 3]]
// 输出: 3
// 解释:
// 时间为0时，你位于坐标方格的位置为(0, 0)。
// 此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。
// 等时间到达 3 时，你才可以游向平台(1, 1).因为此时的水位是 3，坐标方格中的平台没有比水位 3 更高的，所以你可以游向坐标方格中的任意位置
// 示例 2:

// https://assets.leetcode.com/uploads/2021/06/29/swim2-grid-1.jpg

// 输入: grid = [[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]
// 输出: 16
// 解释: 最终的路线用加粗进行了标记。
// 我们必须等到时间为 16，此时才能保证平台(0, 0) 和(4, 4) 是连通的


// 提示:

// n == grid.length
// n == grid[i].length
// 1 <= n <= 50
// 0 <= grid[i][j] < n^2
// grid[i][j] 中每个值 均无重复



/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  const n = grid.length;
  let left = 0, right = n * n - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (check(grid, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

const check = (grid, threshold) => {
  if (grid[0][0] > threshold) {
    return false;
  }
  const n = grid.length;
  const visited = new Array(n).fill(0).map(() => new Array(n).fill(false));
  visited[0][0] = true;
  const queue = [[0, 0]];

  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  while (queue.length) {
    const square = queue.shift();
    const i = square[0], j = square[1];

    for (const direction of directions) {
      const ni = i + direction[0], nj = j + direction[1];
      if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
        if (!visited[ni][nj] && grid[ni][nj] <= threshold) {
          queue.push([ni, nj]);
          visited[ni][nj] = true;
        }
      }
    }
  }
  return visited[n - 1][n - 1];
}