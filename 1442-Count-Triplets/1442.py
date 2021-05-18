class Solution:
  def countTriplets(self, arr: List[int]) -> int:
    cnt, total = Counter(), Counter()
    ans = s = 0

    for k, val in enumerate(arr):
      if (t := s ^ val) in cnt:
        ans += cnt[t] * k - total[t]
      cnt[s] += 1
      total[s] += k
      s = t

    return ans