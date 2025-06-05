// 965. 单值二叉树
// 如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。

// 只有给定的树是单值二叉树时，才返回 true；否则返回 false。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/29/screen-shot-2018-12-25-at-50104-pm.png

// 输入：[1, 1, 1, 1, 1, null, 1]
// 输出：true
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/29/screen-shot-2018-12-25-at-50050-pm.png

// 输入：[2, 2, 2, 5, 2]
// 输出：false


// 提示：

// 给定树的节点数范围是[1, 100]。
// 每个节点的值都是整数，范围为[0, 99] 。

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
 * @return {boolean}
 */
var isUnivalTree = function (root) {
  if (!root) {
    return true;
  }
  if (root.left) {
    if (root.val !== root.left.val || !isUnivalTree(root.left)) {
      return false;
    }
  }
  if (root.right) {
    if (root.val !== root.right.val || !isUnivalTree(root.right)) {
      return false;
    }
  }
  return true;
};