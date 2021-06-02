// 1744. 你能在你最喜欢的那天吃到你最喜欢的糖果吗？
// 给你一个下标从 0 开始的正整数数组 candiesCount ，其中 candiesCount[i] 表示你拥有的第 i 类糖果的数目。同时给你一个二维数组 queries ，其中 queries[i] = [favoriteTypei, favoriteDayi, dailyCapi]。

// 你按照如下规则进行一场游戏：

// 你从第 0 天开始吃糖果。
// 你在吃完 所有 第 i - 1 类糖果之前，不能 吃任何一颗第 i 类糖果。
// 在吃完所有糖果之前，你必须每天 至少 吃 一颗 糖果。
// 请你构建一个布尔型数组 answer ，满足 answer.length == queries.length 。answer[i] 为 true 的条件是：在每天吃 不超过 dailyCapi 颗糖果的前提下，你可以在第 favoriteDayi 天吃到第 favoriteTypei 类糖果；否则 answer[i] 为 false 。注意，只要满足上面 3 条规则中的第二条规则，你就可以在同一天吃不同类型的糖果。

// 请你返回得到的数组 answer 。



// 示例 1：

// 输入：candiesCount = [7, 4, 5, 3, 8], queries = [[0, 2, 2], [4, 2, 4], [2, 13, 1000000000]]
// 输出：[true, false, true]
// 提示：
// 1 - 在第 0 天吃 2 颗糖果(类型 0），第 1 天吃 2 颗糖果（类型 0），第 2 天你可以吃到类型 0 的糖果。
//   2 - 每天你最多吃 4 颗糖果。即使第 0 天吃 4 颗糖果（类型 0），第 1 天吃 4 颗糖果（类型 0 和类型 1），你也没办法在第 2 天吃到类型 4 的糖果。换言之，你没法在每天吃 4 颗糖果的限制下在第 2 天吃到第 4 类糖果。
//   3 - 如果你每天吃 1 颗糖果，你可以在第 13 天吃到类型 2 的糖果。
//   示例 2：

//   输入：candiesCount = [5, 2, 6, 4, 1], queries = [[3, 1, 2], [4, 10, 3], [3, 10, 100], [4, 100, 30], [1, 3, 1]]
// 输出：[false, true, true, false, false]


// 提示：

//   1 <= candiesCount.length <= 105
// 1 <= candiesCount[i] <= 105
// 1 <= queries.length <= 105
// queries[i].length == 3
// 0 <= favoriteTypei < candiesCount.length
// 0 <= favoriteDayi <= 109
// 1 <= dailyCapi <= 109


/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */

var canEat = function (candiesCount, queries) {
  const n = candiesCount.length;

  // 前缀和
  const sum = new Array(n).fill(0);
  sum[0] = candiesCount[0];
  for (let i = 1; i < n; ++i) {
    sum[i] = sum[i - 1] + candiesCount[i];
  }

  const q = queries.length;
  const ans = new Array(q).fill(0);
  for (let i = 0; i < q; ++i) {
    const query = queries[i];
    const favoriteType = query[0], favoriteDay = query[1], dailyCap = query[2];

    const x1 = favoriteDay + 1;
    const y1 = (favoriteDay + 1) * dailyCap;
    const x2 = favoriteType == 0 ? 1 : sum[favoriteType - 1] + 1;
    const y2 = sum[favoriteType];

    ans[i] = !(x1 > y2 || y1 < x2);
  }
  return ans;
}
