// 3161. 物块放置查询
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 有一条无限长的数轴，原点在 0 处，沿着 x 轴 正 方向无限延伸。

// 给你一个二维数组 queries ，它包含两种操作：

// 操作类型 1 ：queries[i] = [1, x] 。在距离原点 x 处建一个障碍物。数据保证当操作执行的时候，位置 x 处 没有 任何障碍物。
// 操作类型 2 ：queries[i] = [2, x, sz] 。判断在数轴范围 [0, x] 内是否可以放置一个长度为 sz 的物块，这个物块需要 完全 放置在范围 [0, x] 内。如果物块与任何障碍物有重合，那么这个物块 不能 被放置，但物块可以与障碍物刚好接触。注意，你只是进行查询，并 不是 真的放置这个物块。每个查询都是相互独立的。
// 请你返回一个 boolean 数组results ，如果第 i 个操作类型 2 的操作你可以放置物块，那么 results[i] 为 true ，否则为 false 。

// 示例 1：

// 输入：queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]

// 输出：[false,true,true]

// 解释：

// https://assets.leetcode.com/uploads/2024/04/22/example0block.png

// 查询 0 ，在 x = 2 处放置一个障碍物。在 x = 3 之前任何大小不超过 2 的物块都可以被放置。

// 示例 2：

// 输入：queries = [[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]]

// 输出：[true,true,false]

// 解释：

// https://assets.leetcode.com/uploads/2024/04/22/example1block.png

// 查询 0 在 x = 7 处放置一个障碍物。在 x = 7 之前任何大小不超过 7 的物块都可以被放置。
// 查询 2 在 x = 2 处放置一个障碍物。现在，在 x = 7 之前任何大小不超过 5 的物块可以被放置，x = 2 之前任何大小不超过 2 的物块可以被放置。

// 提示：

// 1 <= queries.length <= 15 * 10^4
// 2 <= queries[i].length <= 3
// 1 <= queries[i][0] <= 2
// 1 <= x, sz <= min(5 * 10^4, 3 * queries.length)
// 输入保证操作 1 中，x 处不会有障碍物。
// 输入保证至少有一个操作类型 2 。
/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var getResults = function (queries) {
  const mx = 50000;
  const st = [0, mx];

  const bisectLeft = (arr, x) => {
    let lo = 0,
      hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };

  const insort = (arr, x) => {
    const idx = bisectLeft(arr, x);
    arr.splice(idx, 0, x);
  };

  for (const q of queries) {
    if (q[0] === 1) {
      insort(st, q[1]);
    }
  }

  const bt = new Array(mx + 1).fill(0);

  const update = (x, v) => {
    while (x <= mx) {
      if (v > bt[x]) bt[x] = v;
      x += x & -x;
    }
  };

  const query = (x) => {
    let res = 0;
    while (x > 0) {
      if (bt[x] > res) res = bt[x];
      x -= x & -x;
    }
    return res;
  };

  let pre = 0;
  for (const x of st) {
    if (x === 0) {
      continue;
    }
    update(x, x - pre);
    pre = x;
  }

  const ans = [];
  for (let i = queries.length - 1; i >= 0; i--) {
    const q = queries[i];
    if (q[0] === 2) {
      const x = q[1],
        sz = q[2];
      const idx = bisectLeft(st, x);
      let preVal;

      if (idx < st.length && st[idx] === x) {
        preVal = x;
      } else {
        preVal = st[idx - 1];
      }

      let maxSpace = query(preVal);
      maxSpace = Math.max(maxSpace, x - preVal);
      ans.push(maxSpace >= sz);
    } else {
      const x = q[1];
      const idx = bisectLeft(st, x);
      const preVal = st[idx - 1];
      const nxt = st[idx + 1];

      update(nxt, nxt - preVal);
      st.splice(idx, 1);
    }
  }
  return ans.reverse();
};
