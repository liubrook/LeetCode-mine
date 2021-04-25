func increasingBST(root *TreeNode) *TreeNode {
	vals := []int{}
	var inOrder func(*TreeNode)
	inOrder = func(node *TreeNode) {
		if node != nil {
			inOrder(node.Left)
			vals = append(vals, node.Val)
			inOrder(node.Right)
		}
	}
	inOrder(root)

	dummyNode := &TreeNode()
	curNode := dummyNode
	for _, val := range vals {
		curNode.Right = &TreeNode{Val: val}
		curNode = curNode.Right
	}
	return dummyNode.Right
}