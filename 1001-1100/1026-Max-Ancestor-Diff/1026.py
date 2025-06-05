class Solution:
    def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
        def dfs(root, mi, ma):
            if root == None:
                return 0
            diff = max(abs(root.val - mi), abs(root.val - ma))
            mi = min(mi, root.val)
            ma = max(ma, root.val)
            diff = max(diff, dfs(root.left, mi, ma))
            diff = max(diff, dfs(root.right, mi, ma))
            return diff
        return dfs(root, root.val, root.val)