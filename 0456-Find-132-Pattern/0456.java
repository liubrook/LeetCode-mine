class Solution {
  public boolean find132pattern(int[] nums) {
    int n = nums.length;
    Deque<Integer> candidateK = new LinkedList<Integer>();
    candidateK.push(nums[n - 1]);
    int maxK = Integer.MIN_VALUE;

    for (int i = n - 2; i >= 0; --i) {
      if (nums[i] < max) {
        return true;
      }
      while (!candidateK.isEmpty() && nums[i] > candidateK.peek()) {
        maxK = candidateK.pop();
      }
      if (nums[i] > maxK) {
        candidateK.push(nums[i]);
      }
    }
    return false;
  }
}