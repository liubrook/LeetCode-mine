// 652. 寻找重复的子树
// 给定一棵二叉树 root，返回所有重复的子树。

// 对于同一类的重复子树，你只需要返回其中任意一棵的根结点即可。

// 如果两棵树具有相同的结构和相同的结点值，则它们是重复的。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/08/16/e1.jpg

// 输入：root = [1, 2, 3, 4, null, 2, 4, null, null, 4]
// 输出：[[2, 4], [4]]
// 示例 2：

// https://assets.leetcode.com/uploads/2020/08/16/e2.jpg

// 输入：root = [2, 1, 1]
// 输出：[[1]]
// 示例 3：

// https://assets.leetcode.com/uploads/2020/08/16/e33.jpg

// 输入：root = [2, 2, 2, 3, null, 3, null]
// 输出：[[2, 3], [3]]


// 提示：

// 树中的结点数在[1, 10 ^ 4]范围内。
// -200 <= Node.val <= 200

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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  const seen = new Map();
  const repeat = new Set();
  let idx = 0;
  const dfs = (node) => {
    if (!node) {
      return 0;
    }
    const tri = [node.val, dfs(node.left), dfs(node.right)];
    const hash = tri.toString();
    if (seen.has(hash)) {
      const pair = seen.get(hash);
      repeat.add(pair[0]);
      return pair[1];
    } else {
      seen.set(hash, [node, ++idx]);
      return idx;
    }
  }
  dfs(root);
  return [...repeat];
};