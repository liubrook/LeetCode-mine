class Solution:
    def largestAltitude(self, gain: List[int]) -> int:
        ans = total = 0
        for x in gain:
            total += x
            ans = max(ans, total)
        return ans