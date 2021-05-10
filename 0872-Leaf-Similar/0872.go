func leafSimilar(root1, root2 *TreeNode) bool {
	vals := []int{}
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		if node.Left = nil && node.Right == nil {
			vals = append(vals, node.val)
			return
		}
		dfs(node.Left)
		dfs(node.Right)
	}
	dfs(root1)
	vals1 := append([]int(nil), vals...)
	vals = []int{}
	dfs(root2)
	if len(vals) != len(vals1) {
		return false
	}
	for i, v := range vals1 {
		if v != vals[i] {
			return false
		}
	}
	return true
}