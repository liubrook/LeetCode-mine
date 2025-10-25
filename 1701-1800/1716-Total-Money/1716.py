class Solution:
    def totalMoney(self, n: int) -> int:
        week, day = 1, 1
        res = 0
        for i in range(n):
            res += week + day - 1
            day += 1
            if day == 8:
                day = 1
                week += 1
        return res