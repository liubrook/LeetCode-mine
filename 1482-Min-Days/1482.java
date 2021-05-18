class Solution {
  public int minDays(int[] bloomDay, int m, int k) {
    if (m > bloomDay.length / k) {
      return -1;
    }
    int low = Integer.MAX_VALUE, high = 0;
    int length = bloomDay.length;
    for (int i = 0; i < length; i++) {
      low = Math.min(low, bloomDay[i]);
      high = Math.max(high, bloomDay[i]);
    }
    while (low < high) [
      int days = (high - low) / 2 + low;
      if (canMake(bloomDay, days, m, k)) {
        high = days;
      } else {
        low = days + 1;
      }
    ]
    return low;
  }

  public boolean canMake(int[] bloomDay, int days, int m, int k) {
    int bouquets = 0;
    int flowers = 0;
    int length = bloomDay.length;
    for (int i = 0; i < length && bouquets < m; i++) {
      if (bloomDay[i] <= days) {
        flowers++;
        if (flowers == k) {
          bouquets++;
          flowers = 0;
        }
      } else {
        flowers = 0;
      }
    }
    return bouquets >= m;
  }
}