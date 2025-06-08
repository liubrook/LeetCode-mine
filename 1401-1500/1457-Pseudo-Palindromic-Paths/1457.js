// 1457. 二叉树中的伪回文路径
// 提示
// 中等
// 70
// 相关企业
// 给你一棵二叉树，每个节点的值为 1 到 9 。我们称二叉树中的一条路径是 「伪回文」的，当它满足：路径经过的所有节点值的排列中，存在一个回文序列。

// 请你返回从根到叶子节点的所有路径中 伪回文 路径的数目。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/23/palindromic_paths_1.png

// 输入：root = [2, 3, 1, 3, 1, null, 1]
// 输出：2
// 解释：上图为给定的二叉树。总共有 3 条从根到叶子的路径：红色路径[2, 3, 3] ，绿色路径[2, 1, 1] 和路径[2, 3, 1] 。
// 在这些路径中，只有红色和绿色的路径是伪回文路径，因为红色路径[2, 3, 3] 存在回文排列[3, 2, 3] ，绿色路径[2, 1, 1] 存在回文排列[1, 2, 1] 。
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/23/palindromic_paths_2.png

// 输入：root = [2, 1, 1, 1, 3, null, null, null, null, null, 1]
// 输出：1
// 解释：上图为给定二叉树。总共有 3 条从根到叶子的路径：绿色路径[2, 1, 1] ，路径[2, 1, 3, 1] 和路径[2, 1] 。
// 这些路径中只有绿色路径是伪回文路径，因为[2, 1, 1] 存在回文排列[1, 2, 1] 。
// 示例 3：

// 输入：root = [9]
// 输出：1


// 提示：

// 给定二叉树的节点数目在范围[1, 10^5] 内
// 1 <= Node.val <= 9

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
 * @return {number}
 */
var pseudoPalindromicPaths = function (root) {
  let counter = new Array(10).fill(0);
  return dfs(root, counter);
};

var dfs = function (root, counter) {
  if (!root) {
    return 0;
  }
  counter[root.val]++;
  let res = 0;
  if (!root.left && !root.right) {
    if (isPseudoPalindrome(counter)) {
      res = 1;
    }
  } else {
    res = dfs(root.left, counter) + dfs(root.right, counter);
  }
  counter[root.val]--;
  return res;
}

var isPseudoPalindrome = function (counter) {
  let odd = 0;
  for (value of counter) {
    if (value % 2 == 1) {
      odd++;
    }
  }
  return odd <= 1;
}