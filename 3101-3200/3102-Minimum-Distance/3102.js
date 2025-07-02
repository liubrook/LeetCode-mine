// 3102. 最小化曼哈顿距离
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个下标从 0 开始的数组 points ，它表示二维平面上一些点的整数坐标，其中 points[i] = [xi, yi] 。

// 两点之间的距离定义为它们的
// 曼哈顿距离
// 。

// 请你恰好移除一个点，返回移除后任意两点之间的 最大 距离可能的 最小 值。



// 示例 1：

// 输入：points = [[3, 10], [5, 15], [10, 2], [4, 4]]
// 输出：12
// 解释：移除每个点后的最大距离如下所示：
// - 移除第 0 个点后，最大距离在点(5, 15) 和(10, 2) 之间，为 | 5 - 10 | + | 15 - 2 | = 18 。
// - 移除第 1 个点后，最大距离在点(3, 10) 和(10, 2) 之间，为 | 3 - 10 | + | 10 - 2 | = 15 。
// - 移除第 2 个点后，最大距离在点(5, 15) 和(4, 4) 之间，为 | 5 - 4 | + | 15 - 4 | = 12 。
// - 移除第 3 个点后，最大距离在点(5, 15) 和(10, 2) 之间的，为 | 5 - 10 | + | 15 - 2 | = 18 。
// 在恰好移除一个点后，任意两点之间的最大距离可能的最小值是 12 。
// 示例 2：

// 输入：points = [[1, 1], [1, 1], [1, 1]]
// 输出：0
// 解释：移除任一点后，任意两点之间的最大距离都是 0 。


// 提示：

// 3 <= points.length <= 10^5
// points[i].length == 2
// 1 <= points[i][0], points[i][1] <= 10^8

/**
 * @param {number[][]} points
 * @return {number}
 */
var minimumDistance = function (points) {
  const n = points.length;
  const sx = [];
  const sy = [];

  for (let i = 0; i < n; i++) {
    const [x, y] = points[i];
    sx.push([x - y, i]);
    sy.push([x + y, i]);
  }
  sx.sort((a, b) => a[0] - b[0]);
  sy.sort((a, b) => a[0] - b[0]);
  const maxVal1 = sx[n - 1][0] - sx[0][0];
  const maxVal2 = sy[n - 1][0] - sy[0][0];
  let res = Infinity;
  if (maxVal1 >= maxVal2) {
    const i = sx[0][1], j = sx[n - 1][1];
    // 去掉 i 后的最大曼哈顿距离
    res = Math.min(res, Math.max(remove(sx, i), remove(sy, i)));
    // 去掉 j 后的最大曼哈顿距离
    res = Math.min(res, Math.max(remove(sx, j), remove(sy, j)));
  } else {
    const i = sy[0][1], j = sy[n - 1][1];
    // 去掉 i 后的最大曼哈顿距离
    res = Math.min(res, Math.max(remove(sx, i), remove(sy, i)));
    // 去掉 j 后的最大曼哈顿距离
    res = Math.min(res, Math.max(remove(sx, j), remove(sy, j)));
  }
  return res;
};

function remove(arr, i) {
  const n = arr.length;
  if (arr[0][1] === i) {
    return arr[n - 1][0] - arr[1][0];
  } else if (arr[n - 1][1] === i) {
    return arr[n - 2][0] - arr[0][0];
  } else {
    return arr[n - 1][0] - arr[0][0];
  }
}