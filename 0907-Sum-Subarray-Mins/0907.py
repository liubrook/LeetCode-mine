MOD = 10 ** 9 + 7

class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        n = len(arr)
        monoStack = []
        dp = [0] * n
        ans = 0
        for i, x in enumerate(arr):
            while monoStack and arr[monoStack[-1]] > x:
                monoStack.pop()
            k = i - monoStack[-1] if monoStack else i + 1
            dp[i] = k * x + (dp[i - k] if monoStack else 0)
            ans = (ans + dp[i]) % MOD
            monoStack.append(i)
        return ans