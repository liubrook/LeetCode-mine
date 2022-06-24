// 515. 在每个树行中找最大值
// 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。



// 示例1：

// https://assets.leetcode.com/uploads/2020/08/21/largest_e1.jpg

// 输入: root = [1, 3, 2, 5, 3, null, 9]
// 输出: [1, 3, 9]
// 示例2：

// 输入: root = [1, 2, 3]
// 输出: [1, 3]


// 提示：

// 二叉树的节点个数的范围是[0, 104]
//   - 231 <= Node.val <= 231 - 1


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
 * @return {number[]}
 */
var largestValues = function (root) {
  if (!root) {
    return [];
  }
  const res = [];
  const dfs = (res, root, curHeight) => {
    if (curHeight === res.length) {
      res.push(root.val);
    } else {
      res.splice(curHeight, 1, Math.max(res[curHeight], root.val));
    }
    if (root.left) {
      dfs(res, root.left, curHeight + 1);
    }
    if (root.right) {
      dfs(res, root.right, curHeight + 1);
    }
  }
  dfs(res, root, 0);
  return res;
};