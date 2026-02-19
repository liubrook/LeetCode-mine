class Solution:
    def countBinarySubstrings(self, s: str) -> int:
        ptr, n = 0, len(s)
        last, ans = 0, 0
        
        while ptr < n:
            c = s[ptr]
            count = 0
            while ptr < n and s[ptr] == c:
                ptr += 1
                count += 1
            ans += min(count, last)
            last = count
        
        return ans