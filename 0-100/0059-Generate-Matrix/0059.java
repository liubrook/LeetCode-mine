class Solution {
  public int[][] generateMatrix(int n) {
    int num = 1;
    int[][] matrix = new int[n][n];
    int left = 0, right = n - 1, top = 0, bottom = n - 1;
    while(left <= right && top <= bottom) {
      for (int column = left; column <= right; column++) {
        matrix[top][column] = num;
        num++;
      }
      for (int row = top + 1; row <= bottom; row++) {
        matrix[row][right] = num;
        num++;
      }
      if (left < right && top < bottom) {
        for (int column = right - 1; column > left; column--) {
          matrix[bottom][column] = num;
          num++;
        }
        for (int row = bottom; row > top; row--) {
          matrix[row][left] = num;
          num++;
        }
      }
      left++;
      right--;
      top++;
      bottom--;
    }
    return matrix;
  }
}