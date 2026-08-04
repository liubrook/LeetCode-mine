// 3310. 移除可疑的方法
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 你正在维护一个项目，该项目有 n 个方法，编号从 0 到 n - 1。

// 给你两个整数 n 和 k，以及一个二维整数数组 invocations，其中 invocations[i] = [ai, bi] 表示方法 ai 调用了方法 bi。

// 已知如果方法 k 存在一个已知的 bug。那么方法 k 以及它直接或间接调用的任何方法都被视为 可疑方法 ，我们需要从项目中移除这些方法。

// 只有当一组方法没有被这组之外的任何方法调用时，这组方法才能被移除。

// 返回一个数组，包含移除所有 可疑方法 后剩下的所有方法。你可以以任意顺序返回答案。如果无法移除 所有 可疑方法，则 不 移除任何方法。

// 示例 1:

// 输入: n = 4, k = 1, invocations = [[1,2],[0,1],[3,2]]

// 输出: [0,1,2,3]

// 解释:

// https://assets.leetcode.com/uploads/2024/07/18/graph-2.png

// 方法 2 和方法 1 是可疑方法，但它们分别直接被方法 3 和方法 0 调用。由于方法 3 和方法 0 不是可疑方法，我们无法移除任何方法，故返回所有方法。

// 示例 2:

// 输入: n = 5, k = 0, invocations = [[1,2],[0,2],[0,1],[3,4]]

// 输出: [3,4]

// 解释:

// https://assets.leetcode.com/uploads/2024/07/18/graph-3.png

// 方法 0、方法 1 和方法 2 是可疑方法，且没有被任何其他方法直接调用。我们可以移除它们。

// 示例 3:

// 输入: n = 3, k = 2, invocations = [[1,2],[0,1],[2,0]]

// 输出: []

// 解释:

// https://assets.leetcode.com/uploads/2024/07/20/graph.png

// 所有方法都是可疑方法。我们可以移除它们。

// 提示:

// 1 <= n <= 10^5
// 0 <= k <= n - 1
// 0 <= invocations.length <= 2 * 10^5
// invocations[i] == [ai, bi]
// 0 <= ai, bi <= n - 1
// ai != bi
// invocations[i] != invocations[j]
/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function (n, k, invocations) {
  const edges = Array.from({ length: n }, () => []);
  const inDegree = new Array(n).fill(0);

  for (const [u, v] of invocations) {
    edges[u].push(v);
    inDegree[v]++;
  }

  const queue = new Queue([k]);
  const suspicious = new Uint8Array(n);
  suspicious[k] = 1;

  while (!queue.isEmpty()) {
    const u = queue.pop();
    for (let i = 0; i < edges[u].length; i++) {
      const v = edges[u][i];
      inDegree[v]--;

      if (suspicious[v] === 0) {
        queue.push(v);
        suspicious[v] = 1;
      }
    }
  }

  let canRemoveAll = true;
  const remaining = [];

  for (let i = 0; i < n; i++) {
    if (suspicious[i] === 1 && inDegree[i] > 0) {
      canRemoveAll = false;
      break;
    } else if (suspicious[i] === 0) {
      remaining.push(i);
    }
  }

  if (!canRemoveAll) {
    return Array.from({ length: n }, (_, i) => i);
  }

  return remaining;
};
