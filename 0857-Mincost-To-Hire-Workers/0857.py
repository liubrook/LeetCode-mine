class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], k: int) -> float:
        pairs = sorted(zip(quality, wage), key=lambda p: p[1] / p[0])
        ans = inf
        totalq = 0
        h = []
        for q, w in pairs[:k - 1]:
            totalq += q
            heappush(h, -q)
        for q, w in pairs[k - 1:]:
            totalq += q
            heappush(h, -q)
            ans = min(ans, w / q * totalq)
            totalq += heappop(h)
        return ans