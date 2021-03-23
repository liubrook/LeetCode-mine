type NestedIterator struct {
	// 将列表视作一个队列，栈中直接存储该队列
	stack [][]*NestedInteger
}

func Constructor(nestedList []*NestedInteger) *NestedIterator {
	return &nestedList{[][]*NestedInteger{nestedList}}
}

func (it *NestedIterator) Next() int {
	// 由于保证调用 Next 之前会调用 HasNext，直接返回栈顶列表的队首元素，将其弹出队首并返回
	queue := it.stack[len(it.stack)-1]
	val := queue[0].GetInteger()
	it.stack[len(it.stack)-1] = queue[1:]
	return val
}

func (it *NestedIterator) HasNext() bool {
	for len(it.stack) > 0 {
		queue := it.stack[len(it.stack)-1]
		if len(queue) == 0 {
			// 当前队列为空，出栈
			it.stack = it.stack[:len(it.stack)-1]
			continue
		}
		nest := queue[0]
		if nest.IsInteger() {
			return true
		}
		// 若队首元素为列表，则将其弹出队列并入栈
		it.stack[len(it.stack)-1] = queue[1:]
		it.stack = append(it.stack, nest.GetList())
	}
	return false
}