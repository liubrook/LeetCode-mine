// 587. 安装栅栏
// 在一个二维的花园中，有一些用(x, y) 坐标表示的树。由于安装费用十分昂贵，你的任务是先用最短的绳子围起所有的树。只有当所有的树都被绳子包围时，花园才能围好栅栏。你需要找到正好位于栅栏边界上的树的坐标。



// 示例 1:

// 输入: [[1, 1], [2, 2], [2, 0], [2, 4], [3, 3], [4, 2]]
// 输出: [[1, 1], [2, 0], [4, 2], [3, 3], [2, 4]]
// 解释:
// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/erect_the_fence_1.png
// 示例 2:

// 输入: [[1, 2], [2, 2], [4, 2]]
// 输出: [[1, 2], [2, 2], [4, 2]]
// 解释:
// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/erect_the_fence_2.png
// 即使树都在一条直线上，你也需要先用绳子包围它们。


// 注意:

// 所有的树应当被围在一起。你不能剪断绳子来包围树或者把树分成一组以上。
// 输入的整数在 0 到 100 之间。
// 花园至少有一棵树。
// 所有树的坐标都是不同的。
// 输入的点没有顺序。输出顺序也没有要求。

/**
 * @param {number[][]} trees
 * @return {number[][]}
 */
var outerTrees = function (trees) {
  const n = trees.length;
  if (n < 4) {
    return trees;
  }
  /* 按照 x 大小进行排序，如果 x 相同，则按照 y 的大小进行排序 */
  trees.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
  const hull = [];
  const used = new Array(n).fill(0);
  /* hull[0] 需要入栈两次，不进行标记 */
  hull.push(0);
  /* 求出凸包的下半部分 */
  for (let i = 1; i < n; i++) {
    while (hull.length > 1 && cross(trees[hull[hull.length - 2]], trees[hull[hull.length - 1]], trees[i]) < 0) {
      used[hull[hull.length - 1]] = false;
      hull.pop();
    }
    used[i] = true;
    hull.push(i);
  }
  const m = hull.length;
  /* 求出凸包的上半部分 */
  for (let i = n - 2; i >= 0; i--) {
    if (!used[i]) {
      while (hull.length > m && cross(trees[hull[hull.length - 2]], trees[hull[hull.length - 1]], trees[i]) < 0) {
        used[hull[hull.length - 1]] = false;
        hull.pop();
      }
      used[i] = true;
      hull.push(i);
    }
  }
  /* hull[0] 同时参与凸包的上半部分检测，因此需去掉重复的 hull[0] */
  hull.pop();
  const size = hull.length;
  const res = new Array(size).fill(0).map(() => new Array(2).fill(0));
  for (let i = 0; i < size; i++) {
    res[i] = trees[hull[i]];
  }
  return res;
}

const cross = (p, q, r) => {
  return (q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0]);
}