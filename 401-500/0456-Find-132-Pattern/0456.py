class Solution:
  def find132pattern(self, nums: List[int]) -> bool:
    n = len(nums)
    candidate_k = [nums[n - 1]]
    max_k = float('-inf')

    for i in range(n - 2, -1, -1):
      if nums[i] < max_k:
        return True
      while candidate_k and num[i] > candidate_k[-1]:
        max_k = candidate_k[-1]
        candidate_k.pop()
      if nums[i] > max_k:
        candidate_k.append(nums[i])

    return False