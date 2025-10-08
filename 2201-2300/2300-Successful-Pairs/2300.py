class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        res = [0] * len(spells)
        idx = [i for i in range(len(spells))]
        idx.sort(key = lambda x: spells[x])
        potions.sort(key = lambda x : -x)
        j = 0
        for p in idx:
            v = spells[p]
            while j < len(potions) and potions[j] * v >= success:
                j += 1
            res[p] = j
        return res