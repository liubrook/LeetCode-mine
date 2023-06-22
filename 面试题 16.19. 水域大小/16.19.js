// 面试题 16.19.水域大小
// 你有一个用于表示一片土地的整数矩阵land，该矩阵中每个点的值代表对应地点的海拔高度。若值为0则表示水域。由垂直、水平或对角连接的水域为池塘。池塘的大小是指相连接的水域的个数。编写一个方法来计算矩阵中所有池塘的大小，返回值需要从小到大排序。

// 示例：

// 输入：
// [
//   [0, 2, 1, 0],
//   [0, 1, 0, 1],
//   [1, 1, 0, 1],
//   [0, 1, 0, 1]
// ]
// 输出：[1, 2, 4]
// 提示：

// 0 < len(land) <= 1000
// 0 < len(land[i]) <= 1000

/**
 * @param {number[][]} land
 * @return {number[]}
 */
var pondSizes = function (land) {
  const m = land.length;
  const n = land[0].length;
  const resList = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (land[i][j] === 0) {
        resList.push(dfs(land, i, j));
      }
    }
  }
  const res = resList.sort((a, b) => a - b);
  return res;
};

const dfs = (land, x, y) => {
  const m = land.length;
  const n = land[0].length;
  if (x < 0 || x >= m || y < 0 || y >= n || land[x][y] !== 0) {
    return 0;
  }
  land[x][y] = -1;
  let res = 1;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) {
        continue;
      }
      res += dfs(land, x + dx, y + dy);
    }
  }
  return res;
};