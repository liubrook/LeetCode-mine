// 783. 二叉搜索树节点最小距离
// 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。

// 注意：本题与 530：https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/ 相同



// 示例 1：

// https://assets.leetcode.com/uploads/2021/02/05/bst1.jpg
// 输入：root = [4, 2, 6, 1, 3]
// 输出：1
// 示例 2：

// https://assets.leetcode.com/uploads/2021/02/05/bst2.jpg
// 输入：root = [1, 0, 48, null, null, 12, 49]
// 输出：1


// 提示：

// 树中节点数目在范围[2, 100] 内
// 0 <= Node.val <= 105

var minDiffInBST = function (root) {
  let ans = Number.MAX_SAFE_INTEGER, pre = -1;
  const dfs = (root) => {
    if (root === null) {
      return;
    }
    dfs(root.left);
    if (pre == -1) {
      pre = root.val;
    } else {
      ans = Math.min(ans, root.val - pre);
      pre = root.val;
    }
    dfs(root.right);
  }
  dfs(root);
  return ans;
}