// 572. 另一棵树的子树
// 简单
// 相关标签
// 相关企业
// 提示
// 给你两棵二叉树 root 和 subRoot 。检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true ；否则，返回 false 。

// 二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树。



// 示例 1：
// https://assets.leetcode.com/uploads/2021/04/28/subtree1-tree.jpg

// 输入：root = [3, 4, 5, 1, 2], subRoot = [4, 1, 2]
// 输出：true
// 示例 2：
// https://assets.leetcode.com/uploads/2021/04/28/subtree2-tree.jpg

// 输入：root = [3, 4, 5, 1, 2, null, null, null, null, 0], subRoot = [4, 1, 2]
// 输出：false


// 提示：

// root 树上的节点数量范围是[1, 2000]
// subRoot 树上的节点数量范围是[1, 1000]
//   - 10^4 <= root.val <= 10^4
//   - 10^4 <= subRoot.val <= 10^4

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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  //此题也类似判断两个二叉树是否相等 
  //1. 确定递归函数参数
  const compare = function (left, right) {
    if (left === null && right === null) {
      return true;
    } else if (left !== null && right === null || left === null && right !== null || left.val !== right.val) {
      return false;
    }
    let leftSide = compare(left.left, right.left);
    let rightSide = compare(left.right, right.right);
    let isSame = leftSide && rightSide;
    return isSame;
  }
  if (root === null) {
    return false
  }
  if (compare(root, subRoot)) {
    return true;
  }
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};