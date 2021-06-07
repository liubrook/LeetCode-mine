class Solution {
  public int findTargetSubWays(int[] nums, int target) {
    int sum = 0;
    for (int num : nums) {
      sum += num;
    }
    int diff = sum - target;
    if (diff < 0 || diff % 2 != 0) {
      return 0;
    }
    int neg = diff / 2;
    int[] dp = new int[neg + 1];
    dp[0] = 1;
    for (int num : nums) {
      for (int j = neg; j >= num; j--) {
        dp[j] += dp[j - num];
      }
    }
    return dp[neg];
  }
}