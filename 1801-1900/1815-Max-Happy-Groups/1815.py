class Solution:
    def maxHappyGroups(self, batchSize: int, groups: List[int]) -> int:
        kWidth = 5
        kWidthMask = (1 << kWidth) - 1

        cnt = Counter(x % batchSize for x in groups)

        start = 0
        for i in range(batchSize - 1, 0, -1):
            start = (start << kWidth) | cnt[i]

        @cache
        def dfs(mask: int) -> int:
            if mask == 0:
                return 0

            total = 0
            for i in range(1, batchSize):
                amount = ((mask >> ((i - 1) * kWidth)) & kWidthMask)
                total += i * amount

            best = 0
            for i in range(1, batchSize):
                amount = ((mask >> ((i - 1) * kWidth)) & kWidthMask)
                if amount > 0:
                    result = dfs(mask - (1 << ((i - 1) * kWidth)))
                    if (total - i) % batchSize == 0:
                        result += 1
                    best = max(best, result)

            return best

        ans = dfs(start) + cnt[0]
        dfs.cache_clear()
        return ans