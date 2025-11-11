class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        def getZerosOnes(s: str) -> tuple[int, int]:
            zeros = ones = 0
            for c in s:
                if c == '0':
                    zeros += 1
                else:
                    ones += 1
            return zeros, ones

        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for s in strs:
            zeros, ones = getZerosOnes(s)
            for j in range(m, zeros - 1, -1):
                for k in range(n, ones - 1, -1):
                    dp[j][k] = max(dp[j][k], dp[j - zeros][k - ones] + 1)

        return dp[m][n]