class Trie:
  L = 30

  def __init__(self):
    self.left = None
    self.right = None
    self.min_value = float("inf")

  def insert(self, val: int):
    node = self
    node.min_value = min(node.min_value, val)
    for i in range(Trie.L, -1, -1):
      bit = (val >> i) & 1
      if bit == 0:
        if not node.left:
          node.left = Trie()
        node = node.left
      else:
        if not node.right:
          node.right = Trie()
        node = node.right
      node.min_value = min(node.min_value, val)

  def getMaxXorWithLimit(self, val: int, limit: int) -> int:
    node = self
    if node.min_value > limit:
      return - 1
      
    ans = 0
    for i in range(Trie.L, -1, -1):
      bit = (val >> i) & 1
      check = False
      if bit == 0:
        if node.right and node.right.min_value <= limit:
          node = node.right
          check = True
        else:
          node = node.left
      else:
        if node.left and node.left.min_value <= limit:
          node = node.left
          check = True
        else:
          node = node.right
      if check:
        ans |= 1 << i
    return ans

class Solution:
  def maximizeXor(self, nums: List[int], queries: List[List[int]]) -> List[int]:
    t = Trie()
    for val in nums:
      t.insert(val)

    q = len(queries)
    ans = [0] * q
    for i, (x, m) in enumerate(queries):
      ans[i] = t.getMaxXorWithLimit(x, m)

    return ans