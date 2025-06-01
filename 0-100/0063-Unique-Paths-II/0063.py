class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        n, m = len(obstacleGrid), len(obstacleGrid[0])
        f = [0] * m
        f[0] = 1 if obstacleGrid[0][0] == 0 else 0
        for i in range(n):
            for j in range(m):
                if obstacleGrid[i][j] == 1:
                    f[j] = 0
                elif j > 0 and obstacleGrid[i][j - 1] == 0:
                    f[j] += f[j - 1]
        return f[-1]