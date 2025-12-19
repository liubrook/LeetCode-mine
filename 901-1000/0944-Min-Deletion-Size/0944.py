class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        return sum(any(x > y for x, y in pairwise(col)) for col in zip(*strs))  # 空间复杂度为 O(m)，改用下标枚举可以达到 O(1)