// 3235. 判断矩形的两个角落是否可达
// 困难
// 相关标签
// 相关企业
// 提示
// 给你两个正整数 xCorner 和 yCorner 和一个二维整数数组 circles ，其中 circles[i] = [xi, yi, ri] 表示一个圆心在(xi, yi) 半径为 ri 的圆。

// 坐标平面内有一个左下角在原点，右上角在(xCorner, yCorner) 的矩形。你需要判断是否存在一条从左下角到右上角的路径满足：路径 完全 在矩形内部，不会 触碰或者经过 任何 圆的内部和边界，同时 只 在起点和终点接触到矩形。

// 如果存在这样的路径，请你返回 true ，否则返回 false 。



// 示例 1：

// 输入：X = 3, Y = 4, circles = [[2, 1, 1]]

// 输出：true

// 解释：

// https://assets.leetcode.com/uploads/2024/05/18/example2circle1.png

// 黑色曲线表示一条从(0, 0) 到(3, 4) 的路径。

// 示例 2：

// 输入：X = 3, Y = 3, circles = [[1, 1, 2]]

// 输出：false

// 解释：

// https://assets.leetcode.com/uploads/2024/05/18/example1circle.png

// 不存在从(0, 0) 到(3, 3) 的路径。

// 示例 3：

// 输入：X = 3, Y = 3, circles = [[2, 1, 1], [1, 2, 1]]

// 输出：false

// 解释：

// https://assets.leetcode.com/uploads/2024/05/18/example0circle.png

// 不存在从(0, 0) 到(3, 3) 的路径。

// 示例 4：

// 输入：X = 4, Y = 4, circles = [[5, 5, 1]]

// 输出：true

// 解释：

// https://assets.leetcode.com/uploads/2024/08/04/rectangles.png



// 提示：

// 3 <= xCorner, yCorner <= 10^9
// 1 <= circles.length <= 1000
// circles[i].length == 3
// 1 <= xi, yi, ri <= 10^9

/**
 * @param {number} xCorner
 * @param {number} yCorner
 * @param {number[][]} circles
 * @return {boolean}
 */
var canReachCorner = function (xCorner, yCorner, circles) {
  const pointInCircle = (px, py, x, y, r) => {
    return BigInt(x - px) ** 2n + BigInt(y - py) ** 2n <= BigInt(r) ** 2n;
  };

  const circleIntersectsTopLeftOfRectangle = (x, y, r, xCorner, yCorner) => {
    return (Math.abs(x) <= r && y >= 0 && y <= yCorner) ||
      (x >= 0 && x <= xCorner && Math.abs(y - yCorner) <= r) ||
      pointInCircle(x, y, 0, yCorner, r);
  };

  const circleIntersectsBottomRightOfRectangle = (x, y, r, xCorner, yCorner) => {
    return (Math.abs(y) <= r && x >= 0 && x <= xCorner) ||
      (y >= 0 && y <= yCorner && Math.abs(x - xCorner) <= r) ||
      pointInCircle(x, y, xCorner, 0, r);
  };

  const circlesIntersectInRectangle = (x1, y1, r1, x2, y2, r2, xCorner, yCorner) => {
    return BigInt(x1 - x2) ** 2n + BigInt(y1 - y2) ** 2n <= BigInt(r1 + r2) ** 2n &&
      BigInt(x1) * BigInt(r2) + BigInt(x2) * BigInt(r1) < BigInt(r1 + r2) * BigInt(xCorner) &&
      BigInt(y1) * BigInt(r2) + BigInt(y2) * BigInt(r1) < BigInt(r1 + r2) * BigInt(yCorner);
  };

  const visited = new Array(circles.length).fill(false);

  const dfs = (i) => {
    const [x1, y1, r1] = circles[i];
    if (circleIntersectsBottomRightOfRectangle(x1, y1, r1, xCorner, yCorner)) {
      return true;
    }
    visited[i] = true;
    for (let j = 0; j < circles.length; j++) {
      const [x2, y2, r2] = circles[j];
      if (!visited[j] && circlesIntersectInRectangle(x1, y1, r1, x2, y2, r2, xCorner, yCorner) && dfs(j)) {
        return true;
      }
    }
    return false;
  };

  for (let i = 0; i < circles.length; i++) {
    const [x, y, r] = circles[i];
    if (pointInCircle(0, 0, x, y, r) || pointInCircle(xCorner, yCorner, x, y, r)) {
      return false;
    }
    if (!visited[i] && circleIntersectsTopLeftOfRectangle(x, y, r, xCorner, yCorner) && dfs(i)) {
      return false;
    }
  }
  return true;
};