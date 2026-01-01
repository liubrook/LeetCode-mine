class Solution:
    def repeatedNTimes(self, nums: List[int]) -> int:
        n = len(nums)

        while True:
            x, y = random.randrange(n), random.randrange(n)
            if x != y and nums[x] == nums[y]:
                return nums[x]