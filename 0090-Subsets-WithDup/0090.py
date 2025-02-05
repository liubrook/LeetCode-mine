class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        ans = []
        t = []

        def dfs(choosePre: bool, cur: int):
            if cur == len(nums):
                ans.append(t[:])
                return
            dfs(False, cur + 1)
            if not choosePre and cur > 0 and nums[cur] == nums[cur - 1]:
                return
            t.append(nums[cur])
            dfs(True, cur + 1)
            t.pop()
        dfs(False, 0)
        return ans