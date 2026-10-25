class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        ans = 0

        for i in range(m):
            for j in range(n):
                if grid[i][j] == 0:
                    qu = deque([(i, j)])
                    grid[i][j] = 1
                    closed = True

                    while qu:
                        cx, cy = qu.popleft()
                        if cx == 0 or cy == 0 or cx == m - 1 or cy == n - 1:
                            closed = False
                        for nx, ny in [(cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)]:
                            if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] == 0:
                                grid[nx][ny] = 1
                                qu.append((nx, ny))
                    if closed:
                        ans += 1
        
        return ans
