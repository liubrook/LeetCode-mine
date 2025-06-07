// 1130. 叶值的最小代价生成树
// 给你一个正整数数组 arr，考虑所有满足以下条件的二叉树：

// 每个节点都有 0 个或是 2 个子节点。
// 数组 arr 中的值与树的中序遍历中每个叶节点的值一一对应。
// 每个非叶节点的值等于其左子树和右子树中叶节点的最大值的乘积。
// 在所有这样的二叉树中，返回每个非叶节点的值的最小可能总和。这个和的值是一个 32 位整数。

// 如果一个节点有 0 个子节点，那么该节点为叶节点。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/08/10/tree1.jpg
// 输入：arr = [6, 2, 4]
// 输出：32
// 解释：有两种可能的树，第一种的非叶节点的总和为 36 ，第二种非叶节点的总和为 32 。 
// 示例 2：
// https://assets.leetcode.com/uploads/2021/08/10/tree2.jpg

// 输入：arr = [4, 11]
// 输出：44


// 提示：

// 2 <= arr.length <= 40
// 1 <= arr[i] <= 15
// 答案保证是一个 32 位带符号整数，即小于 2^31 。

/**
 * @param {number[]} arr
 * @return {number}
 */
var mctFromLeafValues = function (arr) {
  const n = arr.length;
  const dp = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  const mval = Array(n).fill(0).map(() => Array(n));
  for (let j = 0; j < n; j++) {
    mval[j][j] = arr[j];
    dp[j][j] = 0;
  }
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      mval[i][j] = Math.max(arr[i], mval[i + 1][j]);
      for (let k = i; k < j; k++) {
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + mval[i][k] * mval[k + 1][j]);
      }
    }
  }
  return dp[0][n - 1];
};