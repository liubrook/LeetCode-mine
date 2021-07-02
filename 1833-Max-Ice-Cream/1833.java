class Solution {
  public int maxIceCream(int[] costs, int coins) {
    Arrays.sort(costs);
    int count = 0;
    int n = costs.length;
    for (int i = 0; i < n; i++) {
      int cost = costs[i];
      if (coins >= cost) {
        coins -= cost;
        count++;
      } else {
        break;
      }
    }
    return count;
  }
}