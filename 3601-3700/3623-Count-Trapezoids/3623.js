// 3623. 统计梯形的数目 I
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二维整数数组 points，其中 points[i] = [xi, yi] 表示第 i 个点在笛卡尔平面上的坐标。

// 水平梯形 是一种凸四边形，具有 至少一对 水平边（即平行于 x 轴的边）。两条直线平行当且仅当它们的斜率相同。

// 返回可以从 points 中任意选择四个不同点组成的 水平梯形 数量。

// 由于答案可能非常大，请返回结果对 109 + 7 取余数后的值。

// 示例 1：

// 输入： points = [[1,0],[2,0],[3,0],[2,2],[3,2]]

// 输出： 3

// 解释：

// https://assets.leetcode.com/uploads/2025/05/01/desmos-graph-6.png
// https://assets.leetcode.com/uploads/2025/05/01/desmos-graph-7.png
// https://assets.leetcode.com/uploads/2025/05/01/desmos-graph-8.png
// 有三种不同方式选择四个点组成一个水平梯形：

// 使用点 [1,0]、[2,0]、[3,2] 和 [2,2]。
// 使用点 [2,0]、[3,0]、[3,2] 和 [2,2]。
// 使用点 [1,0]、[3,0]、[3,2] 和 [2,2]。
// 示例 2：

// 输入： points = [[0,0],[1,0],[0,1],[2,1]]

// 输出： 1

// 解释：

// https://assets.leetcode.com/uploads/2025/04/29/desmos-graph-5.png

// 只有一种方式可以组成一个水平梯形。

// 提示：

// 4 <= points.length <= 10^5
// –10^8 <= xi, yi <= 10^8
// 所有点两两不同。
/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function (points) {
  const pointNum = new Map();
  const MOD = 1000000007n;
  let ans = 0n,
    sum = 0n;
  for (const point of points) {
    const [x, y] = point;
    pointNum.set(y, (pointNum.get(y) || 0) + 1);
  }

  for (const pNum of pointNum.values()) {
    const edge = (BigInt(pNum) * BigInt(pNum - 1)) / 2n;
    ans = (ans + edge * sum) % MOD;
    sum = (sum + edge) % MOD;
  }

  return Number(ans);
};
