class Solution:
    def numFriendRequests(self, ages: List[int]) -> int:
        n = len(ages)
        ages.sort()
        left = right = ans = 0
        for age in ages:
            if age < 15:
                continue
            while ages[left] <= 0.5 * age + 7:
                left += 1
            while right + 1 < n and ages[right + 1] <= age:
                right += 1
            ans += right - left
        return ans