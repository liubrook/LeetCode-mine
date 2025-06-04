class Solution {
  public TreeNode increasingBST(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();
    inOrder(root, res);

    TreeNode dummyNode = new TreeNode(-1);
    TreeNode curNode = dummyNode;
    for (int value : res) {
      curNode.right = new TreeNode(value);
      curNode = curNode.right;
    }
    return dummyNode.right;
  }

  public void inOrder(TreeNode node, List<Integer> res) {
    if (node == null) {
      return;
    }
    inOrder(node.left, res);
    res.add(node.val);
    inOrder(node.right, res);
  }
}