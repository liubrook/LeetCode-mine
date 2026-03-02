// 1536. 排布二进制网格的最少交换次数
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 n x n 的二进制网格 grid，每一次操作中，你可以选择网格的 相邻两行 进行交换。

// 一个符合要求的网格需要满足主对角线以上的格子全部都是 0 。

// 请你返回使网格满足要求的最少操作次数，如果无法使网格符合要求，请你返回 -1 。

// 主对角线指的是从 (1, 1) 到 (n, n) 的这些格子。

// 示例 1：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/02/fw.jpg

// 输入：grid = [[0,0,1],[1,1,0],[1,0,0]]
// 输出：3
// 示例 2：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/02/e2.jpg

// 输入：grid = [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]
// 输出：-1
// 解释：所有行都是一样的，交换相邻行无法使网格符合要求。
// 示例 3：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/02/e3.jpg

// 输入：grid = [[1,0,0],[1,1,0],[1,1,1]]
// 输出：0

// 提示：

// n == grid.length
// n == grid[i].length
// 1 <= n <= 200
// grid[i][j] 要么是 0 要么是 1 。
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minSwaps = function (grid) {
  const n = grid.length;
  const pos = new Array(n).fill(-1);
  for (let i = 0; i < n; ++i) {
    for (let j = n - 1; j >= 0; --j) {
      if (grid[i][j] == 1) {
        pos[i] = j;
        break;
      }
    }
  }

  let ans = 0;
  for (let i = 0; i < n; ++i) {
    let k = -1;
    for (let j = i; j < n; ++j) {
      if (pos[j] <= i) {
        ans += j - i;
        k = j;
        break;
      }
    }
    if (~k) {
      for (let j = k; j > i; --j) {
        const temp = pos[j];
        pos[j] = pos[j - 1];
        pos[j - 1] = temp;
      }
    } else {
      return -1;
    }
  }
  return ans;
};
