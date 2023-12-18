class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        idx = 0
        for i in range(1, len(nums)):
            if nums[i] > nums[idx]:
                idx = i
        return idx