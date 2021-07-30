class Solution {
  public int titleToNumber(String columnTitle) {
    int number = 0;
    int multiple = 1;
    for (int i = columnTitle.length() - 1; i >= 0; i--) {
      int k = columnTitle.charAt(i) - 'A' + 1;
      num += k * multiple;
      multiple *= 26;
    }
    return number;
  }
}