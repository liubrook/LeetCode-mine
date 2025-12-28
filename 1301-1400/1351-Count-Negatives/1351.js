// 1351. 统计有序矩阵中的负数
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 m * n 的矩阵 grid，矩阵中的元素无论是按行还是按列，都以非严格递减顺序排列。 请你统计并返回 grid 中 负数 的数目。

// 示例 1：

// 输入：grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
// 输出：8
// 解释：矩阵中共有 8 个负数。
// 示例 2：

// 输入：grid = [[3,2],[1,0]]
// 输出：0

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 100
// -100 <= grid[i][j] <= 100

// 进阶：你可以设计一个时间复杂度为 O(n + m) 的解决方案吗？
/**
 * @param {number[][]} grid
 * @return {number}
 */
// 暴力
var countNegatives = function (grid) {
  let num = 0;
  for (const row of grid) {
    for (const value of row) {
      if (value < 0) {
        num++;
      }
    }
  }
  return num;
};

// 二分查找
var countNegatives = function (grid) {
  let num = 0;
  for (const row of grid) {
    let l = 0,
      r = row.length - 1,
      pos = -1;
    while (l <= r) {
      const mid = l + Math.floor((r - l) / 2);
      if (row[mid] < 0) {
        pos = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    if (pos !== -1) {
      num += row.length - pos;
    }
  }
  return num;
};

// 分治
var countNegatives = function (grid) {
  const solve = (l, r, L, R) => {
    if (l > r) {
      return 0;
    }

    const mid = l + Math.floor((r - l) / 2);
    let pos = -1;
    // 在当前行中查找第一个负数
    for (let i = L; i <= R; i++) {
      if (grid[mid][i] < 0) {
        pos = i;
        break;
      }
    }

    let ans = 0;
    if (pos !== -1) {
      // 当前行找到负数, 计算当前行的负数个数
      ans += grid[0].length - pos;
      // 递归处理上半部分(使用更小的列范围)
      ans += solve(L, mid - 1, pos, R);
      // 递归处理下半部分(使用相同的列起始范围)
      ans += solve(mid + 1, r, L, pos);
    } else {
      // 当前行没有负数, 只需要递归处理下半部分
      ans += solve(mid + 1, r, L, R);
    }

    return ans;
  };

  return solve(0, grid.length - 1, 0, grid[0].length - 1);
};

// 倒序遍历
var countNegatives = function (grid) {
  let num = 0;
  const m = grid[0].length;
  let pos = grid[0].length - 1;

  for (const row of grid) {
    let i;
    for (i = pos; i >= 0; i--) {
      if (row[i] >= 0) {
        if (i + 1 < m) {
          pos = i + 1;
          num += m - pos;
        }
        break;
      }
    }
    if (i === -1) {
      num += m;
      pos = -1;
    }
  }
  return num;
};
