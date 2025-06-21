// 2258. 逃离火灾
// 提示
// 困难
// 113
// 相关企业
// 给你一个下标从 0 开始大小为 m x n 的二维整数数组 grid ，它表示一个网格图。每个格子为下面 3 个值之一：

// 0 表示草地。
// 1 表示着火的格子。
// 2 表示一座墙，你跟火都不能通过这个格子。
// 一开始你在最左上角的格子(0, 0) ，你想要到达最右下角的安全屋格子(m - 1, n - 1) 。每一分钟，你可以移动到 相邻 的草地格子。每次你移动 之后 ，着火的格子会扩散到所有不是墙的 相邻 格子。

// 请你返回你在初始位置可以停留的 最多 分钟数，且停留完这段时间后你还能安全到达安全屋。如果无法实现，请你返回 - 1 。如果不管你在初始位置停留多久，你 总是 能到达安全屋，请你返回 109 。

// 注意，如果你到达安全屋后，火马上到了安全屋，这视为你能够安全到达安全屋。

// 如果两个格子有共同边，那么它们为 相邻 格子。



// 示例 1：

// https://assets.leetcode.com/uploads/2022/03/10/ex1new.jpg

// 输入：grid = [[0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 2, 2, 1, 0], [0, 2, 0, 0, 1, 2, 0], [0, 0, 2, 2, 2, 0, 2], [0, 0, 0, 0, 0, 0, 0]]
// 输出：3
// 解释：上图展示了你在初始位置停留 3 分钟后的情形。
// 你仍然可以安全到达安全屋。
// 停留超过 3 分钟会让你无法安全到达安全屋。
// 示例 2：

// https://assets.leetcode.com/uploads/2022/03/10/ex2new2.jpg

// 输入：grid = [[0, 0, 0, 0], [0, 1, 2, 0], [0, 2, 0, 0]]
// 输出：-1
// 解释：上图展示了你马上开始朝安全屋移动的情形。
// 火会蔓延到你可以移动的所有格子，所以无法安全到达安全屋。
// 所以返回 - 1 。
// 示例 3：

// https://assets.leetcode.com/uploads/2022/03/10/ex3new.jpg

// 输入：grid = [[0, 0, 0], [2, 2, 0], [1, 2, 0]]
// 输出：1000000000
// 解释：上图展示了初始网格图。
// 注意，由于火被墙围了起来，所以无论如何你都能安全到达安全屋。
// 所以返回 109 。


// 提示：

// m == grid.length
// n == grid[i].length
// 2 <= m, n <= 300
// 4 <= m * n <= 2 * 10^4
// grid[i][j] 是 0 ，1 或者 2 。
// grid[0][0] == grid[m - 1][n - 1] == 0

/**
 * @param {number[][]} grid
 * @return {number}
 */
const dirs = [[0, -1], [0, 1], [1, 0], [-1, 0]];

var maximumMinutes = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const INF = 1e9;
  const fireTime = new Array(m).fill(0).map(() => new Array(n).fill(INF));

  const bfs = function () {
    let q = [];
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] == 1) {
          q.push([i, j])
          fireTime[i][j] = 0
        }
      }
    }

    let time = 1;
    while (q.length > 0) {
      const tmp = q;
      q = [];
      for (const [cx, cy] of tmp) {
        for (const [i, j] of dirs) {
          const nx = cx + i;
          const ny = cy + j;
          if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
            if (grid[nx][ny] == 2 || fireTime[nx][ny] != INF) {
              continue;
            }
            q.push([nx, ny]);
            fireTime[nx][ny] = time;
          }
        }
      }
      time++;
    }
  };

  const check = function (stayTime) {
    visit = new Array(m).fill(0).map(() => new Array(n).fill(false));
    let q = [[0, 0, stayTime]]
    while (q.length > 0) {
      const tmp = q
      q = []
      for (const [cx, cy, time] of tmp) {
        for (const [i, j] of dirs) {
          const nx = cx + i;
          const ny = cy + j;
          if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
            if (visit[nx][ny] || grid[nx][ny] == 2) {
              continue;
            }
            /* 到达安全屋 */
            if (nx == m - 1 && ny == n - 1) {
              return fireTime[nx][ny] >= time + 1;
            }
            /* 火未到达当前位置 */
            if (fireTime[nx][ny] > time + 1) {
              q.push([nx, ny, time + 1]);
              visit[nx][ny] = true;
            }
          }
        }
      }
    }
    return false;
  };

  /* 通过 bfs 求出每个格子着火的时间 */
  bfs();
  /* 二分查找找到最大停留时间 */
  let ans = -1;
  let low = 0, high = m * n;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (check(mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans >= m * n ? 1e9 : ans;
};