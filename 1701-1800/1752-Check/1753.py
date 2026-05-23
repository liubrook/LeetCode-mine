class Solution:
    def check(self, nums: List[int]) -> bool:
        n = len(nums)
        x = 0
        for i in range(1, n):
            if nums[i] < nums[i - 1]:
                x = i
                break
        if x == 0:
            return True
        for i in range(x + 1, n):
            if nums[i] < nums[i - 1]:
                return False
        return nums[0] >= nums[-1]