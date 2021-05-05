class Solution {
  public int deleteAndEarn(int[] nums) {
    int maxVal = 0;
    for (int val : nums) {
      maxVal = Math.max(maxVal, val);
    }
    int[] sum = new int[maxVal + 1];
    for (int val : nums) {
      sum[val] += val;
    }
    return rob(sum);
  }

  public int rob(int[] nums) {
    int size = nums.length;
    int first = nums[0], second = Math.max(nums[0], nums[1]);
    for (int i = 2; i < size; i++) {
      int temp = second;
      second = Math.max(first + nums[i], second);
      first = temp;
    }
    return second;
  }
}