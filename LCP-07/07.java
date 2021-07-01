class Solution {
  public int numWays(int n, int[][] relation, int k) {
    int[] dp = new int[n];
    dp[0] = 1;
    for (int i = 0; i < k; i++) {
      int[] next = new int[n];
      for (int[] edge : relation) {
        int src = edge[0], dst = edge[1];
        next[dst] += dp[src];
      }
      dp = next;
    }
    return dp[n - 1];
  }
}