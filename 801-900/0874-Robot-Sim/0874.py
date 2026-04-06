class Solution:
    def robotSim(self, commands: List[int], obstacles: List[List[int]]) -> int:
        dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
        px, py, d = 0, 0, 1
        mp = set([tuple(i) for i in obstacles])
        res = 0
        for c in commands:
            if c < 0:
                d += 1 if c == -1 else -1
                d %= 4
            else:
                for i in range(c):
                    if tuple([px + dirs[d][0], py + dirs[d][1]]) in mp:
                        break
                    px, py = px + dirs[d][0], py + dirs[d][1]
                    res = max(res, px * px + py * py)
        return res