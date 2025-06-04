class Solution:
  def leafSimilar(self, root1: TreeNode, root2: TreeNode) -> bool:
    def dfs(node: TreeNode):
      if not node.left and not node.right:
        yield node.val
      else:
        if node.left:
          yield from dfs(node.left)
        if node.right:
          yield from dfs(node.right)

    seq1 = list(dfs(root1)) if root1 else list()
    seq2 = list(dfs(root2)) if root2 else list()
    return seq1 == seq2