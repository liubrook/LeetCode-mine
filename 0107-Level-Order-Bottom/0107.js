// 107. 二叉树的层序遍历 II
// 中等
// 相关标签
// 相关企业
// 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）



// 示例 1：
// https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg

// 输入：root = [3, 9, 20, null, null, 15, 7]
// 输出：[[15, 7], [9, 20], [3]]
// 示例 2：

// 输入：root = [1]
// 输出：[[1]]
// 示例 3：

// 输入：root = []
// 输出：[]


// 提示：

// 树中节点数目在范围[0, 2000] 内
//   - 1000 <= Node.val <= 1000

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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  let res = [], queue = [];
  queue.push(root);
  while (queue.length && root !== null) {
    // 存放当前层级节点数组
    let curLevel = [];
    // 计算当前层级节点数量
    let length = queue.length;
    while (length--) {
      let node = queue.shift();
      // 把当前层节点存入curLevel数组
      curLevel.push(node.val);
      // 把下一层级的左右节点存入queue队列
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    // 从数组前头插入值，避免最后反转数组，减少运算时间
    res.unshift(curLevel);
  }
  return res;
};