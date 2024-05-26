class Solution:
    def missingRolls(self, rolls: List[int], mean: int, n: int) -> List[int]:
        missingSum = mean * (n + len(rolls)) - sum(rolls)
        if not n <= missingSum <= n * 6:
            return []
        quotient, remainder = divmod(missingSum, n)
        return [quotient + 1] * remainder + [quotient] * (n - remainder)