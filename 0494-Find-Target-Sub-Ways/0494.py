class Solution:
  def findTargetSubWays(self, nums: List[int], target: int) -> int:
    s = sum(nums)
    if (target + s) & 1: return 0

    V = (target + s) >> 1
    f = [1] + [0] * V
    for n in nums:
      for i in range(V, n - 1, -1):
        f[i] += f[i - n]
    return f[-1]