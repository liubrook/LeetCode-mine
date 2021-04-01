class Solution {
  public int clumsy(int N) {
    Deque<Integer> stack = new LinkedList<Integer>();
    stack.push(N);
    N--;

    int index = 0;
    while (N > 0) {
      if (index % 4 == 0) {
        stack.push(stack.pop() * N);
      } else if (index % 4 == 1) {
        stack.push(stack.pop() / N);
      } else if (index % 4 == 2) {
        stack.push(N);
      } else {
        sta.push(-N);
      }
      index++;
      N--;
    }
    int sum = 0;
    while (!stack.isEmpty()) {
      sum += stack.pop();
    }
    return sum;
  }
}