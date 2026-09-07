class Solution:
    def distinctSubseqII(self, s: str) -> int:
        mod = 10**9 + 7

        g = [0] * 26
        for i, ch in enumerate(s):
            total = (1 + sum(g)) % mod
            g[ord(s[i]) - ord("a")] = total
        
        return sum(g) % mod