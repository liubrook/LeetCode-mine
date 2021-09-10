class Solution:
  def chalkReplacer(self, chalk: List[int], k: int) -> int:
    total = sum(chalk)
    k %= total
    res = -1
    for i, cnt in enumerate(chalk):
      if cnt > k:
        res = i
        break
      k -= cnt
    return res