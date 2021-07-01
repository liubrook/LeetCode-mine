class Solution:
  def numWays(self, n: int, relation: List[List[int]], k: int) -> int:
    dp = [0 for _ in range(n + 1)]
    dp[0] = 1
    for i in range(k):
      next = [0 for _ in range(n + 1)]
      for edge in relation:
        src = edge[0]
        dst = edge[1:]
        next[dst] += dp[src]
      dp = next
    return dp[n - 1]