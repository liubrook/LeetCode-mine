class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        
        dp = [0]*(amount+1)                 # 初始化
        dp[0] = 1   # 合法的初始化：凑出金额0的组合只有一种，即不选任何硬币
        
        # 完全背包：优化后的状态转移
        for coin in coins:                  # 第一层循环：遍历硬币
            for j in range(coin, amount+1): # 第二层循环：遍历背包【正序】
                dp[j] += dp[j-coin]
        
        return dp[amount]