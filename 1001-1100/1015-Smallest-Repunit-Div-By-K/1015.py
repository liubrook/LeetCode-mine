class Solution:
    def smallestRepunitDivByK(self, k: int) -> int:
        if k % 2 == 0 or k % 5 == 0:  # 如果 k 是 2 的倍数或者 5 的倍数，返回 -1
            return -1
        
        ans, resid = 1, 1  # ans 表示长度，resid 表示余数
        while resid % k != 0:  # 当余数不为 0 时
            resid = (resid % k) * (10 % k) + 1  # 模拟除法运算，计算下一次的余数
            ans += 1  # 长度加 1
            
        return ans  # 返回最小整数的长度