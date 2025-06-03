class Solution {
  public boolean checkSubarraySum(int[] nums, int k) {
    int m = nums.length;
    if (m < 2) {
      return false;
    }
    Map<Integer, Integer> map = new HashMap<Integer, Integer>();
    map.put(0, -1);
    int remainder = 0;
    for (int i = 0; i < m; i++) {
      remainder = (remainder + nums[i]) % k;
      if (map.containsKey(remainder)) {
        int prevIndex = map.get(remainder);
        if (i - prevIndex >= 2) {
          return true;
        }
      } else {
        map.put(remainder, i);
      }
    }
    return false;
  }
}