class Solution:
  def minChanges(self, nums: List[int], k: int) -> int:
    MAXX = 2 ** 10

    n = len(nums)
    f = [float("inf")] * MAXX
    f[0] = 0

    for i in range(k):
      count = Counter()
      size = 0
      for j in range(i, n, k):
        count[nums[j]] += 1
        size += 1

      t2min = min(f)

      g = [t2min] * MAXX
      for mask in range(MAXX):
        for x, countx in count.items():
          g[mask] = min(g[mask], f[mask ^ x] - countx)

      f = [val + size for val in g]

    return f[0]