class Solution(object):
  def longestSubstring(self, s, k):
    if len(s) < k:
      return 0
    for c in set(s):
      if s.count(c) < k:
        return max(self.longestSubstring(t, k) for t in s.split(c))
    return len(s)