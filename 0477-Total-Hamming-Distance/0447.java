class Solution {
  public int totalHammingDistance(int[] nums) {
    int ans = 0, n = nums.length;
    for (int i = 0; i < 30; ++i) {
      int c = 0;
      for (int val : nums) {
        c += (val >> i) & 1;
      }
      ans += c * (n - c);
    }
    return ans;
  }
}