class Solution:
  def deleteAndEarn(self, nums: List[int]) -> int:
    maxVal = max(nums)
    total = [0] * (maxVal + 1)
    for val in nums:
      total[val] += val

    def rob(nums: List[int]) -> int:
      size = len(nums)
      first, second = nums[0], max(nums[0], nums[1])
      for i in range(2, size):
        first, second = second, max(first + nums[i], second)
      return second

    return rob(total)