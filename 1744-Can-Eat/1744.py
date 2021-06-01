class Solution:
  def canEat(self, candiesCount: List[int], queries: List[List[int]]) -> List[bool]:
    # 前缀和
    total = list(accumulate(candiesCount))

    ans = list()
    for favoriteType, favoriteDay, dailyCap in queries:
      x1 = favoriteDay + 1
      y1 = (favoriteDay + 1) * dailyCap
      x2 = 1 if favoriteType == 0 else total[favoriteType - 1] + 1
      y2 = total[favoriteType]

      ans.append(not (x1 > y2 or y1 < x2))
      
    return ans