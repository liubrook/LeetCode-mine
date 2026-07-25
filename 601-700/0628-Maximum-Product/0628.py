class Solution:
    def maximumProduct(self, nums: List[int]) -> int:
        """排序方法，时间复杂度O(nlog(n))"""
        # nums.sort()
        # return max(nums[-1] * nums[-2] * nums[-3], nums[-1] * nums[0] * nums[1])

        """遍历一遍数组，不使用排序，时间复杂度O(n)"""
        max1 = -float('inf')       # 第一大的值
        max2 = -float('inf')       # 第二大的值
        max3 = -float('inf')       # 第三大的值
        min1 = float('inf')        # 第一小的值
        min2 = float('inf')        # 第二小的值

        for num in nums:
            if num > max1:         # 啥？你比第一大的值还大？？那好吧，你去做老大
                max3 = max2        # 原老二委屈一下你，去做老三吧，难受...
                max2 = max1        # 原老大委屈一下你，去做老二吧，很难受...
                max1 = num         # 大哥快请上座！！！
            elif num > max2:       # 嗯？你比第二大的值大啊？？那行吧，老二给你做，别碰老大啊，他脾气不好...
                max3 = max2        # 原老二委屈一下你，去做老三吧，难受...
                max2 = num         # 二哥请上座！！
            elif num > max3:       # 别舞舞喳喳的，不就比第三大的值大么？？去去去，那个位置给你了...
                max3 = num         # 三哥上座！
            
            if num < min1:         # 啊？你比第一小的值还小，哈哈哈，笑死我了，来来来，快去！
                min2 = min1        # 原第一小，恭喜你，终于找到比你小的了，你现在是第二小！
                min1 = num         # 老实呆着，你现在是最小的了！！！
            elif num < min2:       # 哦？你比第二小的值小？比最小的还大，嗯..那你去做第二小
                min2 = num         # 来吧，你现在是第二小，原第二小解脱了！
            
        return max(max1 * max2 * max3, max1 * min1 * min2)
