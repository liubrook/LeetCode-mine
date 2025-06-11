class Solution:
    def decrypt(self, code: List[int], k: int) -> List[int]:
        if k == 0:
            return [0] * len(code)
        res = []
        n = len(code)
        code += code
        if k > 0:
            l, r = 1, k
        else:
            l, r = n + k, n - 1
        w = sum(code[l:r+1])
        for i in range(n):
            res.append(w)
            w -= code[l]
            w += code[r + 1]
            l, r = l + 1, r + 1
        return res