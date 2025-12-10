// 3531. 统计被覆盖的建筑
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个正整数 n，表示一个 n x n 的城市，同时给定一个二维数组 buildings，其中 buildings[i] = [x, y] 表示位于坐标 [x, y] 的一个 唯一 建筑。

// 如果一个建筑在四个方向（左、右、上、下）中每个方向上都至少存在一个建筑，则称该建筑 被覆盖 。

// 返回 被覆盖 的建筑数量。

// 示例 1：

// https://pic.leetcode.cn/1745660407-qtNUjI-telegram-cloud-photo-size-5-6212982906394101085-m.jpg

// 输入: n = 3, buildings = [[1,2],[2,2],[3,2],[2,1],[2,3]]

// 输出: 1

// 解释:

// 只有建筑 [2,2] 被覆盖，因为它在每个方向上都至少存在一个建筑：
// 上方 ([1,2])
// 下方 ([3,2])
// 左方 ([2,1])
// 右方 ([2,3])
// 因此，被覆盖的建筑数量是 1。
// 示例 2：

// https://pic.leetcode.cn/1745660407-tUMUKl-telegram-cloud-photo-size-5-6212982906394101086-m.jpg

// 输入: n = 3, buildings = [[1,1],[1,2],[2,1],[2,2]]

// 输出: 0

// 解释:

// 没有任何一个建筑在每个方向上都有至少一个建筑。
// 示例 3：

// https://pic.leetcode.cn/1745660407-bQIwBX-telegram-cloud-photo-size-5-6248862251436067566-x.jpg

// 输入: n = 5, buildings = [[1,3],[3,2],[3,3],[3,5],[5,3]]

// 输出: 1

// 解释:

// 只有建筑 [3,3] 被覆盖，因为它在每个方向上至少存在一个建筑：
// 上方 ([1,3])
// 下方 ([5,3])
// 左方 ([3,2])
// 右方 ([3,5])
// 因此，被覆盖的建筑数量是 1。

// 提示：

// 2 <= n <= 10^5
// 1 <= buildings.length <= 10^5
// buildings[i] = [x, y]
// 1 <= x, y <= n
// buildings 中所有坐标均 唯一 。
/**
 * @param {number} n
 * @param {number[][]} buildings
 * @return {number}
 */
var countCoveredBuildings = function (n, buildings) {
  const maxRow = new Array(n + 1).fill(0);
  const minRow = new Array(n + 1).fill(n + 1);
  const maxCol = new Array(n + 1).fill(0);
  const minCol = new Array(n + 1).fill(n + 1);

  for (const p of buildings) {
    const [x, y] = p;
    maxRow[y] = Math.max(maxRow[y], x);
    minRow[y] = Math.min(minRow[y], x);
    maxCol[x] = Math.max(maxCol[x], y);
    minCol[x] = Math.min(minCol[x], y);
  }

  let res = 0;
  for (const p of buildings) {
    const [x, y] = p;
    if (x > minRow[y] && x < maxRow[y] && y > minCol[x] && y < maxCol[x]) {
      res++;
    }
  }

  return res;
};

countCoveredBuildings(5, [
  [1, 3],
  [3, 2],
  [3, 3],
  [3, 5],
  [5, 3],
]);
