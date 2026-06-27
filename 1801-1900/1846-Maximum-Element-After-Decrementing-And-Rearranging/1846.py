class Solution:
    def maximumElementAfterDecrementingAndRearranging(self, arr: List[int]) -> int:
        n = len(arr)
        cnt = [0] * (n + 1)
        for v in arr:
            cnt[min(v, n)] += 1
        
        miss = 0
        for i in range(1, n + 1):
            if cnt[i] == 0:
                miss += 1
            else:
                miss -= min(cnt[i] - 1, miss)  # miss 不会小于 0，故至多减去 miss 个元素
        
        return n - miss