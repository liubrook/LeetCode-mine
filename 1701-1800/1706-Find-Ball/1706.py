class Solution:
    def findBall(self, grid: List[List[int]]) -> List[int]:
        n = len(grid[0])
        ans = [-1] * n
        for j in range(n):
            col = j  # 球的初始列
            for row in grid:
                dir = row[col]
                col += dir  # 移动球
                if col < 0 or col == n or row[col] != dir:  # 到达侧边或 V 形
                    break
            else:  # 成功到达底部
                ans[j] = col
        return ans