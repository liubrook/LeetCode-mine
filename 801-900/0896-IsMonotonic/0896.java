class Solution {
  public boolean isMonotonic(int[] A) {
    boolean inc = true, dec = true;
    int n = A.length;
    for (int i = 0; i < n - 1; ++i) {
      if (A[i] > A[i + 1]) {
        inc = false;
      }
      if (A[i] < A[i + 1]) {
        dec = false;
      }
    }
  }
  return inc || dec;
}