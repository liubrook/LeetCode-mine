class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        n, m = len(version1), len(version2)
        i, j = 0, 0
        while i < n or j < m:
            x = 0
            while i < n and version1[i] != '.':
                x = x * 10 + ord(version1[i]) - ord('0')
                i += 1
            i += 1  # 跳过点号
            y = 0
            while j < m and version2[j] != '.':
                y = y * 10 + ord(version2[j]) - ord('0')
                j += 1
            j += 1  # 跳过点号
            if x != y:
                return 1 if x > y else -1
        return 0