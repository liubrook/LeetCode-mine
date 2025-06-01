public class NestedIterator implements Iterator<Integer> {
  // 存储列表当前的遍历位置
  private Deque<Iterator<NestedIterator>> stack;

  public NestedIterator(List<NestedInteger> nestedList) {
    stack = new LinkedList<Iterator<NestedInteger>>();
    stack.push(nestedList.iterator());
  }

  @override
  public Integer next() {
    // 由于保证调用next之前会调用hasNext，直接返回栈顶列表的当前元素
    return stack.peek().next().getInteger();
  }

  @override
  public boolean hasNext() {
    while (!stack.isEmpty()) {
      Iterator<NestedInteger> it = stack.peek();
      if (!it.hasNext()) {
        // 遍历到当前列表末尾， 出栈
        stack.pop();
        continue;
      }
      // 若取出的元素是整数，则通过创建一个额外的列表将其重新放入栈中
      NestedInteger nest = it.next();
      if (nest.isInteget()) {
        List<NestedInteger> list = new ArrayLists<NestedInteger>();
        list.add(nest);
        stack.push(list.iterator());
        return true;
      }
      stack.push(nest.getList().iterator());
    }
    return false;
  }
}