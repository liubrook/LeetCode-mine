// 144. 二叉树的前序遍历
// 简单
// 相关标签
// 相关企业
// 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。



// 示例 1：
// https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg

// 输入：root = [1, null, 2, 3]
// 输出：[1, 2, 3]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [1]
// 输出：[1]
// 示例 4：
// https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg

// 输入：root = [1, 2]
// 输出：[1, 2]
// 示例 5：
// https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg

// 输入：root = [1, null, 2]
// 输出：[1, 2]


// 提示：

// 树中节点数目在范围[0, 100] 内
//   - 100 <= Node.val <= 100


// 进阶：递归算法很简单，你可以通过迭代算法完成吗？

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
var preorderTraversal = function (root) {
  let res = [];
  const dfs = function (root) {
    if (root === null) return;
    //先序遍历所以从父节点开始
    res.push(root.val);
    //递归左子树
    dfs(root.left);
    //递归右子树
    dfs(root.right);
  }
  //只使用一个参数 使用闭包进行存储结果
  dfs(root);
  return res;
};