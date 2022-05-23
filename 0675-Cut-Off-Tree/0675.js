// 675. 为高尔夫比赛砍树
// 你被请来给一个要举办高尔夫比赛的树林砍树。树林由一个 m x n 的矩阵表示， 在这个矩阵中：

// 0 表示障碍，无法触碰
// 1 表示地面，可以行走
// 比 1 大的数 表示有树的单元格，可以行走，数值表示树的高度
// 每一步，你都可以向上、下、左、右四个方向之一移动一个单位，如果你站的地方有一棵树，那么你可以决定是否要砍倒它。

// 你需要按照树的高度从低向高砍掉所有的树，每砍过一颗树，该单元格的值变为 1（即变为地面）。

// 你将从(0, 0) 点开始工作，返回你砍完所有树需要走的最小步数。 如果你无法砍完所有的树，返回 - 1 。

// 可以保证的是，没有两棵树的高度是相同的，并且你至少需要砍倒一棵树。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/11/26/trees1.jpg
// 输入：forest = [[1, 2, 3], [0, 0, 4], [7, 6, 5]]
// 输出：6
// 解释：沿着上面的路径，你可以用 6 步，按从最矮到最高的顺序砍掉这些树。
// 示例 2：

// https://assets.leetcode.com/uploads/2020/11/26/trees2.jpg
// 输入：forest = [[1, 2, 3], [0, 0, 0], [7, 6, 5]]
// 输出：-1
// 解释：由于中间一行被障碍阻塞，无法访问最下面一行中的树。
// 示例 3：

// 输入：forest = [[2, 3, 4], [0, 0, 5], [8, 7, 6]]
// 输出：6
// 解释：可以按与示例 1 相同的路径来砍掉所有的树。
// (0, 0) 位置的树，可以直接砍去，不用算步数。


// 提示：

// m == forest.length
// n == forest[i].length
// 1 <= m, n <= 50
// 0 <= forest[i][j] <= 109

/**
 * @param {number[][]} forest
 * @return {number}
 */
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
var cutOffTree = function (forest) {
  const trees = [];
  const row = forest.length;
  const col = forest[0].length;
  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      if (forest[i][j] > 1) {
        trees.push([i, j]);
      }
    }
  }
  trees.sort((a, b) => forest[a[0]][a[1]] - forest[b[0]][b[1]]);

  let cx = 0;
  let cy = 0;
  let ans = 0;
  for (let i = 0; i < trees.length; ++i) {
    let steps = bfs(forest, cx, cy, trees[i][0], trees[i][1]);
    if (steps === -1) {
      return -1;
    }
    ans += steps;
    cx = trees[i][0];
    cy = trees[i][1];
  }
  return ans;
};

const bfs = (forest, sx, sy, tx, ty) => {
  if (sx === tx && sy === ty) {
    return 0;
  }

  const row = forest.length;
  const col = forest[0].length;
  let step = 0;
  const queue = [];
  const visited = new Array(row).fill(0).map(() => new Array(col).fill(0));
  queue.push([sx, sy]);
  visited[sx][sy] = true;
  while (queue.length) {
    step++;
    const sz = queue.length;
    for (let i = 0; i < sz; ++i) {
      const cell = queue.shift();
      const cx = cell[0], cy = cell[1];
      for (let j = 0; j < 4; ++j) {
        const nx = cx + dirs[j][0];
        const ny = cy + dirs[j][1];
        if (nx >= 0 && nx < row && ny >= 0 && ny < col) {
          if (!visited[nx][ny] && forest[nx][ny] > 0) {
            if (nx === tx && ny === ty) {
              return step;
            }
            queue.push([nx, ny]);
            visited[nx][ny] = true;
          }
        }
      }
    }
  }
  return -1;
}