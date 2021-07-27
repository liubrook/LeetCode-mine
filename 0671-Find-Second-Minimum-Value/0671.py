class Solution:
  def findSecondMinimumValue(self, root: TreeNode) -> int:
    ans, rootvalue = -1, root.val

    def dfs(node: TreeNode) -> None:
      nonlocal ans
      if not node:
        return
      if ans != -1 and node.val >= ans:
        return
      if node.val > rootvalue:
        ans = node.val

      dfs(node.left)
      dfs(node.right)

    dfs(root)
    return ans