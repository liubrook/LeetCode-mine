// 3143. 正方形中的最多点数
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个二维数组 points 和一个字符串 s ，其中 points[i] 表示第 i 个点的坐标，s[i] 表示第 i 个点的 标签 。

// 如果一个正方形的中心在(0, 0) ，所有边都平行于坐标轴，且正方形内 不 存在标签相同的两个点，那么我们称这个正方形是 合法 的。

// 请你返回 合法 正方形中可以包含的 最多 点数。

// 注意：

// 如果一个点位于正方形的边上或者在边以内，则认为该点位于正方形内。
// 正方形的边长可以为零。


// 示例 1：

// https://assets.leetcode.com/uploads/2024/03/29/3708-tc1.png

// 输入：points = [[2, 2], [-1, -2], [-4, 4], [-3, 1], [3, -3]], s = "abdca"

// 输出：2

// 解释：

// 边长为 4 的正方形包含两个点 points[0] 和 points[1] 。

// 示例 2：

// https://assets.leetcode.com/uploads/2024/03/29/3708-tc2.png

// 输入：points = [[1, 1], [-2, -2], [-2, 2]], s = "abb"

// 输出：1

// 解释：

// 边长为 2 的正方形包含 1 个点 points[0] 。

// 示例 3：

// 输入：points = [[1, 1], [-1, -1], [2, -2]], s = "ccd"

// 输出：0

// 解释：

// 任何正方形都无法只包含 points[0] 和 points[1] 中的一个点，所以合法正方形中都不包含任何点。



// 提示：

// 1 <= s.length, points.length <= 10^5
// points[i].length == 2
//   - 10^9 <= points[i][0], points[i][1] <= 10^9
// s.length == points.length
// points 中的点坐标互不相同。
// s 只包含小写英文字母。

/**
 * @param {number[][]} points
 * @param {string} s
 * @return {number}
 */
var maxPointsInsideSquare = function (points, s) {
  const min1 = new Array(26).fill(1000000001);
  let min2 = 1000000001;
  const n = s.length;
  for (let i = 0; i < n; ++i) {
    const [x, y] = points[i];
    const j = s.charCodeAt(i) - 'a'.charCodeAt(0);
    const d = Math.max(Math.abs(x), Math.abs(y));
    if (d < min1[j]) {
      min2 = Math.min(min2, min1[j]);
      min1[j] = d;
    } else if (d < min2) {
      min2 = d;
    }
  }
  let res = 0;
  for (const d of min1) {
    if (d < min2) {
      ++res;
    }
  }
  return res;
};