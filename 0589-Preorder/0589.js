// 589. N 叉树的前序遍历
// 给定一个 n 叉树的根节点  root ，返回 其节点值的 前序遍历 。

// n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。


// 示例 1：

// https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png

// 输入：root = [1, null, 3, 2, 4, null, 5, 6]
// 输出：[1, 3, 5, 6, 2, 4]
// 示例 2：

// https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png

// 输入：root = [1, null, 2, 3, 4, 5, null, null, 6, 7, null, 8, null, 9, 10, null, null, 11, null, 12, null, 13, null, null, 14]
// 输出：[1, 2, 3, 6, 7, 11, 14, 4, 8, 12, 5, 9, 13, 10]


// 提示：

// 节点总数在范围[0, 104]内
// 0 <= Node.val <= 104
// n 叉树的高度小于或等于 1000


// 进阶：递归法很简单，你可以使用迭代法完成此题吗 ?

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  const res = [];
  helper(root, res);
  return res;
}

const helper = (root, res) => {
  if (root === null) {
    return;
  }
  res.push(root.val);
  for (const ch of root.children) {
    helper(ch, res);
  }
};