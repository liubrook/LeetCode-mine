class Solution:
  def decode(self, encoded: List[int]) -> List[int]:
    n = len(encoded) + 1
    total = reduce(xor, range(1, n + 1))
    odd = 0
    for i in range(1, n - 1, 2):
      odd ^= encoded[i]

    perm = [total ^ odd]
    for i in range(n - 1):
      perm.append(perm[-1] ^ encoded[i])

    return perm