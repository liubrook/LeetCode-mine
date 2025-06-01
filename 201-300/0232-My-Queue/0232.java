class MyQueue {
  Deque<Integer> inStack;
  Deque<Integer> outStack;

  public MyQueue() {
    inStack = new LinkedList<Integer>();
    outStack = new LinkedList<Integer>();
  }

  public void push(int x) {
    inStack.push(x);
  }

  public int pop() {
    if (outStack.isEmpty()) {
      in2Out();
    }
    return outStack.pop();
  }

  public int peek() {
    if (outStack.isEmpty()) {
      in2Out();
    }
    return outStack.peek();
  }

  public boolean empty() {
    return inStack.isEmpty() && outStack.isEmpty();
  }

  private void in2Out() {
    while(!inStack.isEmpty()) {
      outStack.push(inStack.pop());
    }
  }
}