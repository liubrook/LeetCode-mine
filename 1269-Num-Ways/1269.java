class Solution {
  public int numWays(int steps, int arrLen) {
    final int MODULO = 1000000007;
    int maxColumn = Math.min(arrLen - 1, steps);
    int[] dp = new int[maxColumn + 1];
    dp[0] = 1;
    for (int i = 1; i <= steps; i++) {
      int[] dpNext = new int[maxColumn + 1];
      for (int j = 0; j <= maxColumn; j++) {
        dpNext[j] = dp[j];
        if (j - 1 >= 0) {
          dpNext[j] = (dpNext[j] + dp[j - 1]) % MODULO;
        }
        if (j + 1 <= maxColumn) {
          dpNext[j] = (dpNext[j] + dp[j + 1]) % MODULO;
        }
      }
      dp = dpNext;
    }
    return dp[0];
  }
}