// 1931. 用三种不同颜色为网格涂色
// 困难
// 相关标签
// 相关企业
// 提示
// 给你两个整数 m 和 n 。构造一个 m x n 的网格，其中每个单元格最开始是白色。请你用 红、绿、蓝 三种颜色为每个单元格涂色。所有单元格都需要被涂色。

// 涂色方案需要满足：不存在相邻两个单元格颜色相同的情况 。返回网格涂色的方法数。因为答案可能非常大， 返回 对 109 + 7 取余 的结果。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/06/22/colorthegrid.png
// 输入：m = 1, n = 1
// 输出：3
// 解释：如上图所示，存在三种可能的涂色方案。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/06/22/copy-of-colorthegrid.png
// 输入：m = 1, n = 2
// 输出：6
// 解释：如上图所示，存在六种可能的涂色方案。
// 示例 3：

// 输入：m = 5, n = 5
// 输出：580986


// 提示：

// 1 <= m <= 5
// 1 <= n <= 1000

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var colorTheGrid = function (m, n) {
  const mod = 1000000007;
  // 哈希映射 valid 存储所有满足要求的对一行进行涂色的方案
  const valid = new Map();
  // 在 [0, 3^m) 范围内枚举满足要求的 mask
  const maskEnd = Math.pow(3, m);
  for (let mask = 0; mask < maskEnd; ++mask) {
    const color = [];
    let mm = mask;
    for (let i = 0; i < m; ++i) {
      color.push(mm % 3);
      mm = Math.floor(mm / 3);
    }
    let check = true;
    for (let i = 0; i < m - 1; ++i) {
      if (color[i] === color[i + 1]) {
        check = false;
        break;
      }
    }
    if (check) {
      valid.set(mask, color);
    }
  }

  // 预处理所有的 (mask1, mask2) 二元组，满足 mask1 和 mask2 作为相邻行时，同一列上两个格子的颜色不同
  const adjacent = new Map();
  for (const [mask1, color1] of valid.entries()) {
    for (const [mask2, color2] of valid.entries()) {
      let check = true;
      for (let i = 0; i < m; ++i) {
        if (color1[i] === color2[i]) {
          check = false;
          break;
        }
      }
      if (check) {
        if (!adjacent.has(mask1)) {
          adjacent.set(mask1, []);
        }
        adjacent.get(mask1).push(mask2);
      }
    }
  }

  let f = new Map();
  for (const [mask, _] of valid.entries()) {
    f.set(mask, 1);
  }
  for (let i = 1; i < n; ++i) {
    const g = new Map();
    for (const [mask2, _] of valid.entries()) {
      for (const mask1 of adjacent.get(mask2) || []) {
        g.set(mask2, ((g.get(mask2) || 0) + f.get(mask1)) % mod);
      }
    }
    f = g;
  }

  let ans = 0;
  for (const num of f.values()) {
    ans = (ans + num) % mod;
  }
  return ans;
}