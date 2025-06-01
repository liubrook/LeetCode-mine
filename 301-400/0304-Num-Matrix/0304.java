class NumMatrix {
  int[][] sums;

  public NumMatrix(int[][] matrix) {
    int m = matrix.length;
    if (m > 0) {
      int n = matrix[0].length;
      for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
          sums[i+1][j+1] = sums[i][j+1] + sums[i+1][j] - sums[i][j] + matrix[i][j];
        }
      }
    }
  }

  public int sumRegion(int row1, int col1, int row2, int col2) {
    return sums[row2+1][col2+1] - sums[row1][col2+1] - sums[row2+1][col1] + sums[row1][col1];
  }
}