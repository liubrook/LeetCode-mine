class Solution:
  def minDays(self, bloomDay: List[int], m: int, k: int) -> int:
    if m > len(bloomDay) / k:
      return - 1
      
    def canMake(days: int) -> bool:
      bouquets = flowers = 0
      for i, bloom in enumerate(bloomDay):
        if bloomDay[i] <= days:
          flowers += 1
          if flowers == k:
            bouquets += 1
            if bouquets == m:
              break
            flowers = 0
        else:
          flowers = 0
      return bouquets == m
    
    low, high = min(bloomDay), max(bloomDay)
    while low < high:
      days = (low + high) // 2
      if canMake(days):
        high = days
      else:
        low = days + 1
    return low