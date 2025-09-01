// 3025. 人员站位的方案数 I
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个  n x 2 的二维数组 points ，它表示二维平面上的一些点坐标，其中 points[i] = [xi, yi] 。



// 计算点对(A, B) 的数量，其中

// A 在 B 的左上角，并且
// 它们形成的长方形中（或直线上）没有其它点（包括边界）。
// 返回数量。



// 示例 1：

// 输入：points = [[1, 1], [2, 2], [3, 3]]

// 输出：0

// 解释：

// https://assets.leetcode.com/uploads/2024/01/04/example1alicebob.png

// 没有办法选择 A 和 B，使得 A 在 B 的左上角。

// 示例 2：

// 输入：points = [[6, 2], [4, 4], [2, 6]]

// 输出：2

// 解释：

// https://assets.leetcode.com/uploads/2024/06/25/t2.jpg

// 左边的是点对(points[1], points[0])，其中 points[1] 在 points[0] 的左上角，并且形成的长方形内部是空的。
// 中间的是点对(points[2], points[1])，和左边的一样是合法的点对。
// 右边的是点对(points[2], points[0])，其中 points[2] 在 points[0] 的左上角，但 points[1] 在长方形内部，所以不是一个合法的点对。
// 示例 3：

// 输入：points = [[3, 1], [1, 3], [1, 1]]

// 输出：2

// 解释：

// https://assets.leetcode.com/uploads/2024/06/25/t3.jpg

// 左边的是点对(points[2], points[0])，其中 points[2] 在 points[0] 的左上角并且在它们形成的直线上没有其它点。注意两个点形成一条线的情况是合法的。
// 中间的是点对(points[1], points[2])，和左边一样也是合法的点对。
// 右边的是点对(points[1], points[0])，它不是合法的点对，因为 points[2] 在长方形的边上。


// 提示：

// 2 <= n <= 50
// points[i].length == 2
// 0 <= points[i][0], points[i][1] <= 50
// points[i] 点对两两不同。

/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfPairs = function (points) {
  let ans = 0;
  let n = points.length;
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i];
    for (let j = 0; j < points.length; j++) {
      const pointB = points[j];
      if (i === j || !(pointA[0] <= pointB[0] && pointA[1] >= pointB[1])) {
        continue;
      }

      if (points.length === 2) {
        ans++;
        continue;
      }

      let illegal = false;

      for (const pointTmp of points) {
        if (pointA === pointTmp || pointB === pointTmp) {
          continue;
        }

        const isXContained =
          pointTmp[0] >= pointA[0] && pointTmp[0] <= pointB[0];
        const isYContained =
          pointTmp[1] <= pointA[1] && pointTmp[1] >= pointB[1];

        illegal = isXContained && isYContained;

        if (illegal) {
          break;
        }
      }

      if (!illegal) {
        ans++;
      }
    }
  }

  return ans;
};