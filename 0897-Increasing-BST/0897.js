// 897. 递增顺序搜索树
// 给你一棵二叉搜索树，请你 按中序遍历 将其重新排列为一棵递增顺序搜索树，使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/11/17/ex1.jpg
// 输入：root = [5, 3, 6, 2, 4, null, 8, 1, null, null, null, 7, 9]
// 输出：[1, null, 2, null, 3, null, 4, null, 5, null, 6, null, 7, null, 8, null, 9]
// 示例 2：

// https://assets.leetcode.com/uploads/2020/11/17/ex2.jpg
// 输入：root = [5, 1, 7]
// 输出：[1, null, 5, null, 7]


// 提示：

// 树中节点数的取值范围是[1, 100]
// 0 <= Node.val <= 1000

var increasingBST = function (root) {
  const res = [];
  inOrder(root, res);

  const dummyNode = new TreeNode(-1);
  let curNode = dummyNode;
  for (const value of res) {
    curNode.right = new TreeNode(value);
    curNode = curNode.right;
  }
  return dummyNode.right;
}

const inOrder = (node, res) => {
  if (!node) {
    return;
  }
  inOrder(node.left, res);
  res.push(node.val);
  inOrder(node.right, res);
}