public class Solution {
  public int hammingWeight(int n) {
    int ret = 0;
    for (int i = 0; i < 32; i++) [
      if ((n & (1 << i)) !== 0) {
        ret++;
      }
    ]
    return ret;
  }
}