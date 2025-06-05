class Solution:
  def shipWithInDays(self, weights: List[int], D: int) -> int:
    left, right = max(weights), sum(weights)
    while left < right:
      mid = (left + right) // 2
      need, cur = 1, 0
      for weight in weights:
        if cur + weight > mid:
          need += 1
          cur = 0
        cur += weight

      if need <= D:
        right = mid
      else:
        left = mid + 1

    return left