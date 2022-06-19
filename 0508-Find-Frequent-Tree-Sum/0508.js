// 508. 出现次数最多的子树元素和
// 给你一个二叉树的根结点 root ，请返回出现次数最多的子树元素和。如果有多个元素出现的次数相同，返回所有出现次数最多的子树元素和（不限顺序）。

// 一个结点的 「子树元素和」 定义为以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/04/24/freq1-tree.jpg

// 输入: root = [5, 2, -3]
// 输出: [2, -3, 4]
// 示例 2：

// https://assets.leetcode.com/uploads/2021/04/24/freq2-tree.jpg

// 输入: root = [5, 2, -5]
// 输出: [2]


// 提示:

// 节点数在[1, 104] 范围内
//   - 105 <= Node.val <= 105


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
var findFrequentTreeSum = function (root) {
  const cnt = new Map();
  let maxCnt = 0;

  const dfs = (node) => {
    if (!node) {
      return 0;
    }
    const sum = node.val + dfs(node.left) + dfs(node.right);
    cnt.set(sum, (cnt.get(sum) || 0) + 1);
    maxCnt = Math.max(maxCnt, cnt.get(sum));
    return sum;
  }

  dfs(root);
  const list = [];
  for (const [s, c] of cnt.entries()) {
    if (c === maxCnt) {
      list.push(s);
    }
  }
  const ans = new Array(list.length);
  for (let i = 0; i < list.length; ++i) {
    ans[i] = list[i];
  }
  return ans;
};