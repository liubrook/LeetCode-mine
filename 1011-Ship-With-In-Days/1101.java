class Solution {
  public int shipWithInDays(int[] weights, int D) {
    int left = Arrays.stream(weights).max().getAsInt(), right = Arrays.stream(weights).sum();
    while (left < right) {
      int mid = (left + right) / 2;
      int need = 1, cur = 0;
      for (int weight : weights) {
        if (cur + weight > mid) {
          ++need;
          cur = 0;
        }
        cur += weight;
      }
      if (need <= D) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
}