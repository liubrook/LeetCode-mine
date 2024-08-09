// 2940. 找到 Alice 和 Bob 可以相遇的建筑
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个下标从 0 开始的正整数数组 heights ，其中 heights[i] 表示第 i 栋建筑的高度。

// 如果一个人在建筑 i ，且存在 i < j 的建筑 j 满足 heights[i] < heights[j] ，那么这个人可以移动到建筑 j 。

// 给你另外一个数组 queries ，其中 queries[i] = [ai, bi] 。第 i 个查询中，Alice 在建筑 ai ，Bob 在建筑 bi 。

// 请你能返回一个数组 ans ，其中 ans[i] 是第 i 个查询中，Alice 和 Bob 可以相遇的 最左边的建筑 。如果对于查询 i ，Alice 和 Bob 不能相遇，令 ans[i] 为 - 1 。



// 示例 1：

// 输入：heights = [6, 4, 8, 5, 2, 7], queries = [[0, 1], [0, 3], [2, 4], [3, 4], [2, 2]]
// 输出：[2, 5, -1, 5, 2]
// 解释：第一个查询中，Alice 和 Bob 可以移动到建筑 2 ，因为 heights[0] < heights[2] 且 heights[1] < heights[2] 。
// 第二个查询中，Alice 和 Bob 可以移动到建筑 5 ，因为 heights[0] < heights[5] 且 heights[3] < heights[5] 。
// 第三个查询中，Alice 无法与 Bob 相遇，因为 Alice 不能移动到任何其他建筑。
// 第四个查询中，Alice 和 Bob 可以移动到建筑 5 ，因为 heights[3] < heights[5] 且 heights[4] < heights[5] 。
// 第五个查询中，Alice 和 Bob 已经在同一栋建筑中。
// 对于 ans[i] != -1 ，ans[i] 是 Alice 和 Bob 可以相遇的建筑中最左边建筑的下标。
// 对于 ans[i] == -1 ，不存在 Alice 和 Bob 可以相遇的建筑。
// 示例 2：

// 输入：heights = [5, 3, 8, 2, 6, 1, 4, 6], queries = [[0, 7], [3, 5], [5, 2], [3, 0], [1, 6]]
// 输出：[7, 6, -1, 4, 6]
// 解释：第一个查询中，Alice 可以直接移动到 Bob 的建筑，因为 heights[0] < heights[7] 。
// 第二个查询中，Alice 和 Bob 可以移动到建筑 6 ，因为 heights[3] < heights[6] 且 heights[5] < heights[6] 。
// 第三个查询中，Alice 无法与 Bob 相遇，因为 Bob 不能移动到任何其他建筑。
// 第四个查询中，Alice 和 Bob 可以移动到建筑 4 ，因为 heights[3] < heights[4] 且 heights[0] < heights[4] 。
// 第五个查询中，Alice 可以直接移动到 Bob 的建筑，因为 heights[1] < heights[6] 。
// 对于 ans[i] != -1 ，ans[i] 是 Alice 和 Bob 可以相遇的建筑中最左边建筑的下标。
// 对于 ans[i] == -1 ，不存在 Alice 和 Bob 可以相遇的建筑。


// 提示：

// 1 <= heights.length <= 5 * 104^
// 1 <= heights[i] <= 10^9
// 1 <= queries.length <= 5 * 10^4
// queries[i] = [ai, bi]
// 0 <= ai, bi <= heights.length - 1

/**
 * @param {number[]} heights
 * @param {number[][]} queries
 * @return {number[]}
 */
var leftmostBuildingQueries = function (heights, queries) {
  const n = heights.length;
  const m = queries.length;
  const query = Array.from({ length: n }, () => []);
  const ans = Array(m).fill(-1);
  const st = [];

  for (let i = 0; i < m; i++) {
    let [a, b] = queries[i];
    if (a > b) [a, b] = [b, a];
    if (a === b || heights[a] < heights[b]) {
      ans[i] = b;
      continue;
    }
    query[b].push([i, heights[a]]);
  }

  let top = -1;
  for (let i = n - 1; i >= 0; i--) {
    for (const [q, val] of query[i]) {
      if (top === -1 || heights[st[0]] <= val) {
        ans[q] = -1;
        continue;
      }

      let l = 0, r = top;
      while (l <= r) {
        const mid = (l + r) >> 1;
        if (heights[st[mid]] > val) {
          l = mid + 1;
        } else {
          r = mid - 1;
        }
      }
      ans[q] = st[r];
    }

    while (top >= 0 && heights[st[top]] <= heights[i]) {
      st.pop();
      top--;
    }
    st.push(i);
    top++;
  }

  return ans;
};