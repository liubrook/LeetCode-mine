class Solution:
    def maxIceCream(self, costs: List[int], coins: int) -> int:
        costs.sort()
        ans = 0
        for i in range(len(costs)):
            if coins >= costs[i]:
                ans += 1
                coins -= costs[i]
        return ans