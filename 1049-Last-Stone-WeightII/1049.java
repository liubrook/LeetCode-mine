class Solution {
  public int lastStoneWeightII(int[] stones) {
    int sum = 0;
    for (int weight : stones) {
      sum += weight;
    }
    int m = sum / 2;
    boolean[] dp = new boolean[m + 1];
    dp[0] = true;
    for (int weight : stones) {
      for (int j = m; j >= weight; --j) {
        dp[j] = dp[j] || dp[j - weight];
      }
    }
    for (int j = m;; --j) {
      if (dp[j]) {
        return sum - 2 * j;
      }
    }
  }
}