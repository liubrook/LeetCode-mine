// 812. 最大三角形面积
// 给定包含多个点的集合，从其中取三个点组成三角形，返回能组成的最大三角形的面积。

// 示例:
// 输入: points = [[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]]
// 输出: 2
// 解释:
// 这五个点如下图所示。组成的橙色三角形是最大的，面积为2。
// https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/04/1027.png

// 注意:

// 3 <= points.length <= 50.
// 不存在重复的点。
// -50 <= points[i][j] <= 50.
// 结果误差值在 10 ^ -6 以内都认为是正确答案。

/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function (points) {
  const n = points.length;
  let ret = 0.0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        ret = Math.max(ret, triangleArea(points[i][0], points[i][1], points[j][0], points[j][1], points[k][0], points[k][1]));
      }
    }
  }
  return ret;
};

const triangleArea = (x1, y1, x2, y2, x3, y3) => {
  return 0.5 * Math.abs(x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2);
}