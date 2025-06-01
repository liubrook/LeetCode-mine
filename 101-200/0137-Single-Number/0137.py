class Solution:
  def singleNumber(self, nums: List[int]) -> int:
    freq = collections.Counter(nums)
    ans = [num for nums, occ in freq.items() if occ == 1][0]
    return ans