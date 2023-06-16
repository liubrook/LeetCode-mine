// 1494. 并行课程 II
// 给你一个整数 n 表示某所大学里课程的数目，编号为 1 到 n ，数组 relations 中， relations[i] = [xi, yi]  表示一个先修课的关系，也就是课程 xi 必须在课程 yi 之前上。同时你还有一个整数 k 。

// 在一个学期中，你 最多 可以同时上 k 门课，前提是这些课的先修课在之前的学期里已经上过了。

// 请你返回上完所有课最少需要多少个学期。题目保证一定存在一种上完所有课的方式。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/06/27/leetcode_parallel_courses_1.png

// 输入：n = 4, relations = [[2, 1], [3, 1], [1, 4]], k = 2
// 输出：3
// 解释：上图展示了题目输入的图。在第一个学期中，我们可以上课程 2 和课程 3 。然后第二个学期上课程 1 ，第三个学期上课程 4 。
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/06/27/leetcode_parallel_courses_2.png

// 输入：n = 5, relations = [[2, 1], [3, 1], [4, 1], [1, 5]], k = 2
// 输出：4
// 解释：上图展示了题目输入的图。一个最优方案是：第一学期上课程 2 和 3，第二学期上课程 4 ，第三学期上课程 1 ，第四学期上课程 5 。
// 示例 3：

// 输入：n = 11, relations = [], k = 2
// 输出：6


// 提示：

// 1 <= n <= 15
// 1 <= k <= n
// 0 <= relations.length <= n * (n - 1) / 2
// relations[i].length == 2
// 1 <= xi, yi <= n
// xi != yi
// 所有先修关系都是不同的，也就是说 relations[i] != relations[j] 。
// 题目输入的图是个有向无环图。

/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number} k
 * @return {number}
 */
var minNumberOfSemesters = function (n, relations, k) {
  const dp = new Array(1 << n).fill(Infinity);
  const need = new Array(1 << n).fill(0);
  for (const edge of relations) {
    need[(1 << (edge[1] - 1))] |= 1 << (edge[0] - 1);
  }
  dp[0] = 0;
  for (let i = 1; i < (1 << n); ++i) {
    need[i] = need[i & (i - 1)] | need[i & (-i)];
    if ((need[i] | i) !== i) {
      continue;
    }
    const valid = i ^ need[i];
    if (bitCount(valid) <= k) {
      dp[i] = Math.min(dp[i], dp[i ^ valid] + 1);
    } else {
      for (let sub = valid; sub; sub = (sub - 1) & valid) {
        if (bitCount(sub) <= k) {
          dp[i] = Math.min(dp[i], dp[i ^ sub] + 1);
        }
      }
    }
  }
  return dp[(1 << n) - 1];
}

function bitCount(n) {
  let count = 0;
  while (n) {
    count++;
    n &= n - 1;
  }
  return count;
}