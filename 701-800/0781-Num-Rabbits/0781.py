class Solution:
  def numRabbits(self, answers: List[int]) -> int:
    count = Counter(answers)
    ans = sum((x + y) // (y + 1) * (y + 1) for y, x in count.items())
    return ans