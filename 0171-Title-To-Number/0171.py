class Solution:
  def titleToNumber(self, columnTitle: str) -> int:
    number, multiple = 0, 1
    for i in range(len(columnTitle) - 1, -1, -1):
      k = ord(columnTitle[i]) - ord("A") + 1
      number += k * multiple
      multiple *= 26
    return number