type BSTIterator struct {
	stack []*TreeNode
	cur   *TreeNode
}

func Constructor(root *TreeNode) BSTIterator {
	return BSTIterator{cur: root}
}

func (it *BSTIterator) Next() int {
	for node := it.cur; node != nil; node = node.Left {
		it.stack = append(it.stack, node)
	}
	it.cur, it.stack = it.stack[len(it.stack)-1], it.stack[:len(it.stack)-1]
	val := it.cur.Val
	it.cur = it.cur.Right
	return val
}

func (it *BSTIterator) HasNext() bool {
	return it.cur != nil || len(it.stack) > 0
}