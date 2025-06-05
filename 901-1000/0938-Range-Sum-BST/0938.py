class Solution:
  def rangeSumBST(self, root: TreeNode, low: int, high: int) -> int:
    if not root:
      return 0
    if root.val > high:
      return self.rangeSumBST(root.left, low, high)
    if root.val < low:
      return self.rangeSumBST(root.right, low, high)
    return root.val + self.rangeSumBST(root.left, low, high) + self.rangeSumBST(root.right, low, high)