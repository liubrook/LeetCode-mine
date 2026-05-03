class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        m, n = len(s), len(goal)
        if m != n:
            return False
        for i in range(n):
            for j in range(n):
                if s[(i + j) % n] != goal[j]:
                    break
            else:
                return True
        return False