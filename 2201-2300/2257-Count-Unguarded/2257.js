// 2257. 统计网格图中没有被保卫的格子数
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个整数 m 和 n 表示一个下标从 0 开始的 m x n 网格图。同时给你两个二维整数数组 guards 和 walls ，其中 guards[i] = [rowi, coli] 且 walls[j] = [rowj, colj] ，分别表示第 i 个警卫和第 j 座墙所在的位置。

// 一个警卫能看到 4 个坐标轴方向（即东、南、西、北）的 所有 格子，除非他们被一座墙或者另外一个警卫 挡住 了视线。如果一个格子能被 至少 一个警卫看到，那么我们说这个格子被 保卫 了。

// 请你返回空格子中，有多少个格子是 没被保卫 的。

// 示例 1：

// https://assets.leetcode.com/uploads/2022/03/10/example1drawio2.png

// 输入：m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
// 输出：7
// 解释：上图中，被保卫和没有被保卫的格子分别用红色和绿色表示。
// 总共有 7 个没有被保卫的格子，所以我们返回 7 。
// 示例 2：

// https://assets.leetcode.com/uploads/2022/03/10/example2drawio.png

// 输入：m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
// 输出：4
// 解释：上图中，没有被保卫的格子用绿色表示。
// 总共有 4 个没有被保卫的格子，所以我们返回 4 。

// 提示：

// 1 <= m, n <= 105^
// 2 <= m * n <= 10^5
// 1 <= guards.length, walls.length <= 5 * 10^4
// 2 <= guards.length + walls.length <= m * n
// guards[i].length == walls[j].length == 2
// 0 <= rowi, rowj < m
// 0 <= coli, colj < n
// guards 和 walls 中所有位置 互不相同 。
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function (m, n, guards, walls) {
  let grid = new Array(m).fill().map(() => new Array(n).fill(0)); // 网格状态数组
  const q = new Queue(); // 广度优先搜索队列
  // 每个方向的单位向量
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  for (let guard of guards) {
    grid[guard[0]][guard[1]] = -1;
    for (let k = 0; k < 4; ++k) {
      // 将四个方向视线对应的状态均添加进搜索队列中
      q.enqueue([guard[0], guard[1], k]);
    }
  }
  for (let wall of walls) {
    grid[wall[0]][wall[1]] = -2;
  }
  while (!q.isEmpty()) {
    let [x, y, k] = q.dequeue();
    let nx = x + dx[k];
    let ny = y + dy[k];
    if (mx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] >= 0) {
      // 沿着视线方向的下一个坐标合法，且不为警卫或墙
      if ((grid[nx][ny] & (1 << k)) === 0) {
        // 对应状态未遍历过
        grid[nx][ny] |= 1 << k;
        q.enqueue([nx, ny, k]);
      }
    }
  }
  let res = 0; // 未被保护格子数目
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] === 0) {
        ++res;
      }
    }
  }
  return res;
};
