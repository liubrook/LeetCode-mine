class Solution:
    def postorder(self, root: 'Node') -> List[int]:
        ans = []
        def dfs(node: 'Node'):
            if node is None:
                return
            for ch in node.children:
                dfs(ch)
            ans.append(node.val)
        dfs(root)
        return ans