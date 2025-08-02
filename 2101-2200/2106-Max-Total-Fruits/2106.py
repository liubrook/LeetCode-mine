class Solution:
    def maxTotalFruits(self, fruits: List[List[int]], startPos: int, k: int) -> int:
        left = 0
        right = 0
        n = len(fruits)
        sum = 0
        ans = 0

        def step(left: int, right: int) -> int:
            if fruits[right][0] <= startPos:
                return startPos - fruits[left][0]
            elif fruits[left][0] >= startPos:
                return fruits[right][0] - startPos
            else:
                return min(abs(startPos - fruits[right][0]), abs(startPos - fruits[left][0])) + \
                    fruits[right][0] - fruits[left][0]

        # 每次固定住窗口右边界
        while right < n:
            sum += fruits[right][1]
            # 移动左边界
            while left <= right and step(left, right) > k:
                sum -= fruits[left][1]
                left += 1

            ans = max(ans, sum)
            right += 1

        return ans