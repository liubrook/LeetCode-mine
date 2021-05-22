class Solution:
  def xorGame(self, nums: List[int]) -> bool:
    if len(nums) % 2 == 0:
      return True

    xorsum = reduce(xor, nums)
    return xorsum == 0