class NumArray:
  def __init__(self, nums: List[int]):
    self.nums = [0]
    _sums = self.nums

    for num in nums:
      _sums.append(_sums[-1] + num)

  def sumRange(self, i: int, j: int) -> int:
    _sums =  self.nums
    return _sums[j + 1] - _sums[i]