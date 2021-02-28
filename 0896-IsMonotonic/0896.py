class Solution:
  def isMonotonic(self, A):
    N = len(A)
    inc, dec = True, True
    for i in range(1, N):
      if A[i] > A[i + 1]:
        inc = False
      if A[i] < A[i + 1]:
        dec = False
      if not inc and not dec:
        return False
    return True