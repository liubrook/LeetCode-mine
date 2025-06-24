// 2476. 二叉搜索树最近节点查询
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个 二叉搜索树 的根节点 root ，和一个由正整数组成、长度为 n 的数组 queries 。

// 请你找出一个长度为 n 的 二维 答案数组 answer ，其中 answer[i] = [mini, maxi] ：

// mini 是树中小于等于 queries[i] 的 最大值 。如果不存在这样的值，则使用 - 1 代替。
// maxi 是树中大于等于 queries[i] 的 最小值 。如果不存在这样的值，则使用 - 1 代替。
// 返回数组 answer 。



// 示例 1 ：

// https://assets.leetcode.com/uploads/2022/09/28/bstreeedrawioo.png

// 输入：root = [6, 2, 13, 1, 4, 9, 15, null, null, null, null, null, null, 14], queries = [2, 5, 16]
// 输出：[[2, 2], [4, 6], [15, -1]]
// 解释：按下面的描述找出并返回查询的答案：
// - 树中小于等于 2 的最大值是 2 ，且大于等于 2 的最小值也是 2 。所以第一个查询的答案是[2, 2] 。
// - 树中小于等于 5 的最大值是 4 ，且大于等于 5 的最小值是 6 。所以第二个查询的答案是[4, 6] 。
// - 树中小于等于 16 的最大值是 15 ，且大于等于 16 的最小值不存在。所以第三个查询的答案是[15, -1] 。
// 示例 2 ：

// https://assets.leetcode.com/uploads/2022/09/28/bstttreee.png

// 输入：root = [4, null, 9], queries = [3]
// 输出：[[-1, 4]]
// 解释：树中不存在小于等于 3 的最大值，且大于等于 3 的最小值是 4 。所以查询的答案是[-1, 4] 。


// 提示：

// 树中节点的数目在范围[2, 10^5] 内
// 1 <= Node.val <= 10^6
// n == queries.length
// 1 <= n <= 10^5
// 1 <= queries[i] <= 10^6

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} queries
 * @return {number[][]}
 */
var binarySearch = function (arr, target) {
  let lo = 0, hi = arr.length - 1;
  let ret = arr.length;
  while (lo <= hi) {
    let mid = (lo + hi) >> 1;
    if (arr[mid] >= target) {
      ret = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return ret;
}

var closestNodes = function (root, queries) {
  const arr = new Array();
  const dfs = function (root) {
    if (!root) {
      return;
    }
    dfs(root.left);
    arr.push(root.val);
    dfs(root.right);
  }
  dfs(root);

  const res = new Array();
  for (const val of queries) {
    let maxVal = -1, minVal = -1;
    let index = binarySearch(arr, val);
    if (index != arr.length) {
      maxVal = arr[index];
      if (arr[index] == val) {
        minVal = arr[index];
        res.push([minVal, maxVal]);
        continue;
      }
    }
    if (index != 0) {
      minVal = arr[index - 1];
    }
    res.push([minVal, maxVal]);
  }
  return res;
};