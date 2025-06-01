class Solution:
  def partition(self, s):
    """
    :type s: str
    :rtype: List[List[str]]
    """
    results = [[s[0]]]
    for c in s[1:]:
      for r in results:
        r.append(c)

      extra = []
      for r in results:
        if len(r) > 1:
          p = r[-2] + r[-1]
          if p == p[::-1]:
            extra.append(r[:-2] + [p])
          elif len(r) > 2:
            p = r[-3] + r[-2] + r[-1]
            if p == p[::-1]:
              extra.append(r[:-3] + [p])

      results.extend(extra)
    return results

if __name__=='__main__':
  s = 'aab'
  print(Solution().partition(s))