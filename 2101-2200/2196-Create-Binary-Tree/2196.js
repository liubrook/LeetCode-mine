// 2196. 根据描述创建二叉树
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二维整数数组 descriptions ，其中 descriptions[i] = [parenti, childi, isLefti] 表示 parenti 是 childi 在 二叉树 中的 父节点，二叉树中各节点的值 互不相同 。此外：

// 如果 isLefti == 1 ，那么 childi 就是 parenti 的左子节点。
// 如果 isLefti == 0 ，那么 childi 就是 parenti 的右子节点。
// 请你根据 descriptions 的描述来构造二叉树并返回其 根节点 。

// 测试用例会保证可以构造出 有效 的二叉树。

// 示例 1：

// https://assets.leetcode.com/uploads/2022/02/09/example1drawio.png

// 输入：descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
// 输出：[50,20,80,15,17,19]
// 解释：根节点是值为 50 的节点，因为它没有父节点。
// 结果二叉树如上图所示。
// 示例 2：

// https://assets.leetcode.com/uploads/2022/02/09/example2drawio.png

// 输入：descriptions = [[1,2,1],[2,3,0],[3,4,1]]
// 输出：[1,2,null,null,3,4]
// 解释：根节点是值为 1 的节点，因为它没有父节点。
// 结果二叉树如上图所示。

// 提示：

// 1 <= descriptions.length <= 10^4
// descriptions[i].length == 3
// 1 <= parenti, childi <= 10^5
// 0 <= isLefti <= 1
// descriptions 所描述的二叉树是一棵有效二叉树
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function (descriptions) {
  const nodes = new Map();
  let root = 0;

  for (const [x, y, isLeft] of descriptions) {
    if (!nodes.has(x)) {
      nodes.set(x, new TreeNode(x));
      root ^= x;
    }
    if (!nodes.has(y)) {
      nodes.set(y, new TreeNode(y));
      root ^= y;
    }
    if (isLeft) {
      nodes.get(x).left = nodes.get(y);
    } else {
      nodes.get(x).right = nodes.get(y);
    }
    root ^= y;
  }
  return nodes.get(root);
};
