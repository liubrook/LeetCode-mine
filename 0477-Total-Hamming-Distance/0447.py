class Solution:
  def totalHammingDistance(self, nums: List[int]) -> int:
    n = len(nums)
    ans = 0
    for i in range(30):
      c = sum(((val >> i) & 1) for val in nums)
      ans += c * (n - c)
    return ans