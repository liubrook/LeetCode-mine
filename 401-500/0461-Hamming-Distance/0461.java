class Solution {
  public int hammingDistance(int x, int y) {
    int s = x ^ y, ret = 0
    while (s != 0) {
      s &= s - 1;
      ret++;
    }
    return ret;
  }
}