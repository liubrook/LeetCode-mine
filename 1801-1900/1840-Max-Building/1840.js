// 1840. 最高建筑高度
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 在一座城市里，你需要建 n 栋新的建筑。这些新的建筑会从 1 到 n 编号排成一列。

// 这座城市对这些新建筑有一些规定：

// 每栋建筑的高度必须是一个非负整数。
// 第一栋建筑的高度 必须 是 0 。
// 任意两栋相邻建筑的高度差 不能超过  1 。
// 除此以外，某些建筑还有额外的最高高度限制。这些限制会以二维整数数组 restrictions 的形式给出，其中 restrictions[i] = [idi, maxHeighti] ，表示建筑 idi 的高度 不能超过 maxHeighti 。

// 题目保证每栋建筑在 restrictions 中 至多出现一次 ，同时建筑 1 不会 出现在 restrictions 中。

// 请你返回 最高 建筑能达到的 最高高度 。

// 示例 1：
// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2021/04/25/ic236-q4-ex1-1.png

// 输入：n = 5, restrictions = [[2,1],[4,1]]
// 输出：2
// 解释：上图中的绿色区域为每栋建筑被允许的最高高度。
// 我们可以使建筑高度分别为 [0,1,2,1,2] ，最高建筑的高度为 2 。
// 示例 2：
// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2021/04/25/ic236-q4-ex2.png

// 输入：n = 6, restrictions = []
// 输出：5
// 解释：上图中的绿色区域为每栋建筑被允许的最高高度。
// 我们可以使建筑高度分别为 [0,1,2,3,4,5] ，最高建筑的高度为 5 。
// 示例 3：
// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2021/04/25/ic236-q4-ex3.png

// 输入：n = 10, restrictions = [[5,3],[2,5],[7,4],[10,3]]
// 输出：5
// 解释：上图中的绿色区域为每栋建筑被允许的最高高度。
// 我们可以使建筑高度分别为 [0,1,2,3,3,4,4,5,4,3] ，最高建筑的高度为 5 。

// 提示：

// 2 <= n <= 10^9
// 0 <= restrictions.length <= min(n - 1, 10^5)
// 2 <= idi <= n
// idi 是 唯一的 。
// 0 <= maxHeighti <= 10^9
/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @return {number}
 */
var maxBuilding = function (n, restrictions) {
  let r = restrictions.map((res) => [res[0], res[1]]);
  // 增加限制(1,0)
  r.push([1, 0]);
  // 按位置排序
  r.sort((a, b) => a[0] - b[0]);
  // 增加限制(n, n - 1)
  if (r[r.length - 1][0] !== n) {
    r.push([n, n - 1]);
  }
  const m = r.length;
  // 从左向右传递限制
  for (let i = 1; i < m; i++) {
    const dist = r[i][0] - r[i - 1][0];
    r[i][1] = Math.min(r[i][1], r[i - 1][1] + dist);
  }
  // 从右向左传递限制
  for (let i = m - 2; i >= 0; i--) {
    const dist = r[i + 1][0] - r[i][0];
    r[i][1] = Math.min(r[i][1], r[i + 1][1] + dist);
  }
  let ans = 0;
  for (let i = 0; i < m - 1; i++) {
    const dist = r[i + 1][0] - r[i][0];
    const best = Math.floor((dist + r[i][1] + r[i + 1][1]) / 2);
    ans = Math.max(ans, best);
  }
  return ans;
};
