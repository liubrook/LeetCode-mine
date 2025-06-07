class Solution:
  def numWays(self, steps: int, arrLen: int) -> int:
    mod = 10 ** 9 + 7
    maxColumn = min(arrLen - 1, steps)

    dp = [0] * (maxColumn + 1)
    dp[0] = 1

    for i in range(1, steps + 1):
      dpNext = [0] * (maxColumn + 1)
      for j in range(0, maxColumn + 1):
        dpNext[j] = dp[j]
        if j - 1 >= 0:
          dpNext[j] = (dpNext[j] + dp[j - 1]) % mod
        if j + 1 <= maxColumn:
          dpNext[j] = (dpNext[j] + dp[j - 1]) % mod
      dp = dpNext

    return dp[0]