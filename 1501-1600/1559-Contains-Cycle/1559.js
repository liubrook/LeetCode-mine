// 1559. 二维网格图中探测环
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二维字符网格数组 grid ，大小为 m x n ，你需要检查 grid 中是否存在 相同值 形成的环。

// 一个环是一条开始和结束于同一个格子的长度 大于等于 4 的路径。对于一个给定的格子，你可以移动到它上、下、左、右四个方向相邻的格子之一，可以移动的前提是这两个格子有 相同的值 。

// 同时，你也不能回到上一次移动时所在的格子。比方说，环  (1, 1) -> (1, 2) -> (1, 1) 是不合法的，因为从 (1, 2) 移动到 (1, 1) 回到了上一次移动时的格子。

// 如果 grid 中有相同值形成的环，请你返回 true ，否则返回 false 。

// 示例 1：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/22/5482e1.png

// 输入：grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]
// 输出：true
// 解释：如下图所示，有 2 个用不同颜色标出来的环：
// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/22/5482e11.png
// 示例 2：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/22/5482e2.png

// 输入：grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]
// 输出：true
// 解释：如下图所示，只有高亮所示的一个合法环：
// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/22/5482e22.png
// 示例 3：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/22/5482e3.png

// 输入：grid = [["a","b","b"],["b","z","b"],["b","b","a"]]
// 输出：false

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m <= 500
// 1 <= n <= 500
// grid 只包含小写英文字母。
/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var containsCycle = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const uf = new UnionFind(m * n);

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i > 0 && grid[i][j] === grid[i - 1][j]) {
        if (!uf.findAndUnite(i * n + j, (i - 1) * n + j)) {
          return true;
        }
      }
      if (j > 0 && grid[i][j] === grid[i][j - 1]) {
        if (!uf.findAndUnite(i * n + j, i * n + j - 1)) {
          return true;
        }
      }
    }
  }
  return false;
};

class UnionFind {
  constructor(n) {
    this.parent = new Array(n);
    this.size = new Array(n).fill(1);
    for (let i = 0; i < n; ++i) {
      this.parent[i] = i;
    }
  }

  findSet(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.findSet(this.parent[x]);
    }
    return this.parent[x];
  }

  unite(x, y) {
    if (this.size[x] < this.size[y]) {
      [x, y] = [y, x];
    }
    this.parent[y] = x;
    this.size[x] += this.size[y];
  }

  findAndUnite(x, y) {
    const parentX = this.findSet(x);
    const parentY = this.findSet(y);
    if (parentX !== parentY) {
      this.unite(parentX, parentY);
      return true;
    }
    return false;
  }
}
