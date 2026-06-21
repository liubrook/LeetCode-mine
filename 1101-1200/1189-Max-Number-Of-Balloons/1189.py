class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        cnt = Counter(ch for ch in text if ch in "balon")
        cnt['l'] //= 2
        cnt['o'] //= 2
        return min(cnt.values()) if len(cnt) == 5 else 0