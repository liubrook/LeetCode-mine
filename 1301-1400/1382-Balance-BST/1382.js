// 1382. 将二叉搜索树变平衡
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一棵二叉搜索树，请你返回一棵 平衡后 的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。如果有多种构造方法，请你返回任意一种。

// 如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是 平衡的 。

// 示例 1：

// https://assets.leetcode.com/uploads/2021/08/10/balance1-tree.jpg

// 输入：root = [1,null,2,null,3,null,4,null,null]
// 输出：[2,1,3,null,null,null,4]
// 解释：这不是唯一的正确答案，[3,1,4,null,2,null,null] 也是一个可行的构造方案。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/08/10/balanced2-tree.jpg

// 输入: root = [2,1,3]
// 输出: [2,1,3]

// 提示：

// 树节点的数目在 [1, 10^4] 范围内。
// 1 <= Node.val <= 10^5
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
 * @return {TreeNode}
 */
var balanceBST = function (root) {
  const inorderSeq = [];

  const getInorder = (o) => {
    if (o.left) {
      getInorder(o.left);
    }
    inorderSeq.push(o.val);
    if (o.right) {
      getInorder(o.right);
    }
  };

  const build = (l, r) => {
    const mid = (l + r) >> 1;
    const o = new TreeNode(inorderSeq[mid]);
    if (l <= mid - 1) {
      o.left = build(l, mid - 1);
    }
    if (mid + 1 <= r) {
      o.right = build(mid + 1, r);
    }
    return o;
  };

  getInorder(root);
  return build(0, inorderSeq.length - 1);
};
