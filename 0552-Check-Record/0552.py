class Solution:
    def checkRecord(self, n: int) -> int:
        MOD = 10**9 + 7
        # A 的数量，结尾连续 L 的数量
        dp = [[0, 0, 0], [0, 0, 0]]
        dp[0][0] = 1

        for i in range(1, n + 1):
            dpNew = [[0, 0, 0], [0, 0, 0]]

            # 以 P 结尾的数量
            for j in range(0, 2):
                for k in range(0, 3):
                    dpNew[j][0] = (dpNew[j][0] + dp[j][k]) % MOD
            
            # 以 A 结尾的数量
            for k in range(0, 3):
                dpNew[1][0] = (dpNew[1][0] + dp[0][k]) % MOD
            
            # 以 L 结尾的数量
            for j in range(0, 2):
                for k in range(1, 3):
                    dpNew[j][k] = (dpNew[j][k] + dp[j][k - 1]) % MOD
            
            dp = dpNew
        
        total = 0
        for j in range(0, 2):
            for k in range(0, 3):
                total += dp[j][k]
        
        return total % MOD