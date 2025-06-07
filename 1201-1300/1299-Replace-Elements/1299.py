class Solution:
  def replaceElements(self, arr: List[int]) -> List[int]:
    n = len(arr)
    ans = [0] * (n - 1) + [-1]
    for i in range(n - 2, -1, -1):
      ans[i] = max(ans[i + 1], arr[i + 1])
    return ans