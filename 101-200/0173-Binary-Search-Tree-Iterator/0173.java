class BSTIterator {
  private TreeNode cur;
  private Deque<TreeNode> stack;

  public BSTIterator(TreeNode root) {
    cur = root;
    stack = new LinkedList<TreeNode>();
  }

  public int next() {
    while (cur != null) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    int ret = cur.val;
    cur = cur.right;
    return ret;
  }

  public boolean hasNext() {
    return cur != null || !stack.isEmpty();
  }
}