// 2975. 移除栅栏得到的正方形田地的最大面积
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 有一个大型的 (m - 1) x (n - 1) 矩形田地，其两个对角分别是 (1, 1) 和 (m, n) ，田地内部有一些水平栅栏和垂直栅栏，分别由数组 hFences 和 vFences 给出。

// 水平栅栏为坐标 (hFences[i], 1) 到 (hFences[i], n)，垂直栅栏为坐标 (1, vFences[i]) 到 (m, vFences[i]) 。

// 返回通过 移除 一些栅栏（可能不移除）所能形成的最大面积的 正方形 田地的面积，或者如果无法形成正方形田地则返回 -1。

// 由于答案可能很大，所以请返回结果对 109 + 7 取余 后的值。

// 注意：田地外围两个水平栅栏（坐标 (1, 1) 到 (1, n) 和坐标 (m, 1) 到 (m, n) ）以及两个垂直栅栏（坐标 (1, 1) 到 (m, 1) 和坐标 (1, n) 到 (m, n) ）所包围。这些栅栏 不能 被移除。

// 示例 1：

// https://assets.leetcode.com/uploads/2023/11/05/screenshot-from-2023-11-05-22-40-25.png

// 输入：m = 4, n = 3, hFences = [2,3], vFences = [2]
// 输出：4
// 解释：移除位于 2 的水平栅栏和位于 2 的垂直栅栏将得到一个面积为 4 的正方形田地。
// 示例 2：

// https://assets.leetcode.com/uploads/2023/11/22/maxsquareareaexample1.png

// 输入：m = 6, n = 7, hFences = [2], vFences = [4]
// 输出：-1
// 解释：可以证明无法通过移除栅栏形成正方形田地。

// 提示：

// 3 <= m, n <= 10^9
// 1 <= hFences.length, vFences.length <= 600
// 1 < hFences[i] < m
// 1 < vFences[i] < n
// hFences 和 vFences 中的元素是唯一的。
/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
var maximizeSquareArea = function (m, n, hFences, vFences) {
  const MOD = 1000000007;

  const getEdges = (fences, border) => {
    const set = new Set();
    const list = [...fences];
    list.push(1);
    list.push(border);
    list.sort((a, b) => a - b);

    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        set.add(list[j] - list[i]);
      }
    }

    return set;
  };

  const hEdges = getEdges(hFences, m);
  const vEdges = getEdges(vFences, n);

  let res = 0;
  for (const e of hEdges) {
    if (vEdges.has(e)) {
      res = Math.max(res, e);
    }
  }

  if (res === 0) {
    return -1;
  }

  return Number((BigInt(res) * BigInt(res)) % BigInt(MOD));
};
