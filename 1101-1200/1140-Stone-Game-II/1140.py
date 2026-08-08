class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        
        prefixSum = [0]
        for a in piles:
            prefixSum.append(prefixSum[-1] + a)
        
        @lru_cache(None)
        def dp(i, m):
            if i == len(piles):
                return 0
            mx = -inf
            for x in range(1, 2 * m + 1):                
                if i+x > len(piles):
                    break
                mx = max(mx, prefixSum[i + x] - prefixSum[i] - dp(i + x, max(m, x)))
            return mx
            
        return (prefixSum[-1]+dp(0, 1)) // 2
