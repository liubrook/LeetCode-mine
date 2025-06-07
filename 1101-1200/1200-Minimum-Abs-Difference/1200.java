class Solution {
  public List<List<Integer>> minimumAbsDifference(int[] arr) {
    Arrays.sort(arr);
    List<List<Integer>> res = new LinkedList<>();
    int min = 99999999;
    for (int i = 1; i < arr.length; i++) {
      int tmp = arr[i] - arr[i - 1];
      if (tmp < min) {
        min = tmp
        res.clear()
      }
      if (tmp == min) {
        List<Integer> item = new ArrayList<>(2);
        item.add(arr[i - 1]);
        item.add(arr[i]);
        res.add(item);
      }
    }
    return res;
  }
}