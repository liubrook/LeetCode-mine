class Solution:
  def hammingWeight(self, n: int) -> int:
    ret = 0
    while n:
      n &= n - 1
      ret += 1
    return ret