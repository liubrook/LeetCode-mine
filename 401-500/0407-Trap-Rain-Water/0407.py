class Solution:
    def trapRainWater(self, heightMap: List[List[int]]) -> int:
        m, n = len(heightMap), len(heightMap[0])
        maxHeight = max(max(row) for row in heightMap)
        water = [[maxHeight for _ in range(n)] for _ in range(m)]
        dirs = [-1, 0, 1, 0, -1]

        qu = []
        for i in range(m):
            for j in range(n):
                if i == 0 or i == m - 1 or j == 0 or j == n - 1:
                     if water[i][j] > heightMap[i][j]:
                        water[i][j] = heightMap[i][j]
                        qu.append([i, j])
        
        while len(qu) > 0:
            [x, y] = qu.pop(0)
            for i in range(4):
                nx, ny = x + dirs[i], y + dirs[i + 1]
                if nx < 0 or nx >= m or ny < 0 or ny >= n:
                    continue
                if water[x][y] < water[nx][ny] and water[nx][ny] > heightMap[nx][ny]:
                    water[nx][ny] = max(water[x][y], heightMap[nx][ny])
                    qu.append([nx, ny])

        ans = 0
        for i in range(m):
            for j in range(n):
                ans = ans + water[i][j] - heightMap[i][j]
        return ans