class Solution:
  def topKFrequent(self, words: List[str], k: int) -> List[str]:
    m = {}
    for word in words:
      if word not in m:
        m[word] = 1
      else:
        m[word] += 1
    sorted_list = sorted(m.items(), key=lambda item: (-item[1], item[0]))
    return [item[0] for item in sorted_list][:k]